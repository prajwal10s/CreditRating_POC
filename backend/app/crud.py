import uuid
from sqlalchemy.orm import Session
from . import models, schemas
import math

def checkIfNotANumber(x):
    x = float('nan')
    if math.isnan(x):
        return True
    else:
        return False
def post_mortgage(db: Session, mortgage: schemas.MortgageCreate):
    existing_mortgages = db.query(models.Mortgage).all()
    if existing_mortgages:  # Calculate avg_credit_score only if there are existing records
        total_credit_score = sum(m.creditScore for m in existing_mortgages)
        avg_credit_score = total_credit_score / len(existing_mortgages)
    else:
        avg_credit_score = mortgage.creditScore
    
    creditRating = calculate_credit_rating(**mortgage.model_dump(), avg_credit_score=avg_credit_score)    
    print(f"Credit rating is {creditRating}")
    db_mortgage = models.Mortgage(id = uuid.uuid4(), **mortgage.model_dump(), creditRating=creditRating)  
    #print("Credit rating is BBB") #hardcoded for now
    db.add(db_mortgage)
    db.commit()
    db.refresh(db_mortgage)
    return db_mortgage

def get_mortgages(db: Session):
    return db.query(models.Mortgage).all()

def get_mortgage_by_id(db: Session, mortgage_id: str):
    return db.query(models.Mortgage).filter(models.Mortgage.id == mortgage_id).first()

def update_mortgage(db: Session, mortgage_id: str, mortgage_update: schemas.MortgageBase):
    mortgage = get_mortgage_by_id(db, mortgage_id)
    if not mortgage:
        return None

    for key, value in mortgage_update.dict(exclude_unset=True).items():
        setattr(mortgage, key, value)

    db.commit()
    db.refresh(mortgage)
    return mortgage

def calculate_credit_rating(loanAmount, propertyValue, debtAmount, annualIncome, creditScore, loanType, propertyType, avg_credit_score):
    risk_score = 0
    if(creditScore<300 or creditScore>850):
        raise ValueError("Credit score must be between 300 and 850")
    if loanAmount < 0 | checkIfNotANumber(loanAmount) :
        raise ValueError("Loan amount cannot be negative")
    if propertyValue < 0 | checkIfNotANumber(propertyValue):
        raise ValueError("Property Value cannot be negative")
    if debtAmount < 0 | checkIfNotANumber(debtAmount):
        raise ValueError("Debt Amount cannot be negative")
    if annualIncome < 0 | checkIfNotANumber(annualIncome):
        raise ValueError("Annual Income cannot be negative")
    if creditScore < 0 | checkIfNotANumber(creditScore):
        raise ValueError("Credit Score cannot be negative")
    
    # Loan-to-Value (LTV) Ratio
    ltv = (loanAmount / propertyValue) * 100
    if ltv > 90:
        risk_score += 2
    elif ltv > 80:
        risk_score += 1

    # Debt-to-Income (DTI) Ratio
    dti = (debtAmount / annualIncome) * 100
    if dti > 50:
        risk_score += 2
    elif dti > 40:
        risk_score += 1

    # Credit Score
    if creditScore >= 700:
        risk_score -= 1
    elif creditScore < 650:
        risk_score += 1

    # Loan Type
    if loanType == "Fixed":
        risk_score -= 1
    elif loanType == "Adjustable":
        risk_score += 1

    # Property Type
    if propertyType == "Condo":
        risk_score += 1

    # Adjust final risk score based on Average Credit Score
    if avg_credit_score >= 700:
        risk_score -= 1
    elif avg_credit_score < 650:
        risk_score += 1

    # Determine Credit Rating
    if risk_score <= 2:
        return "AAA"
    elif 3 <= risk_score <= 5:
        return "BBB"
    else:
        return "C"
    