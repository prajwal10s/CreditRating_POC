import uuid
from sqlalchemy.orm import Session
from . import models, schemas

def calculate_rating(db: Session, mortgage: schemas.MortgageCreate):
    db_mortgage = models.Mortgage(id = uuid.uuid4(), **mortgage.model_dump(), creditRating="BBB")  # Placeholder before the logic is coded
    print("Credit rating is BBB") #hardcoded for now
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

    