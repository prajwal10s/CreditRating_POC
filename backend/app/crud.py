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