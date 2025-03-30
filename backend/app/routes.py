from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from . import schemas, crud
from fastapi import status
from typing import List

router = APIRouter()

@router.post("/api/mortgages/", response_model=schemas.MortgageResponse)
def add_mortgage(mortgage: schemas.MortgageCreate, db: Session = Depends(get_db)):
    created_mortgage = crud.calculate_rating(db, mortgage)
    
    if not created_mortgage:
        raise HTTPException(status_code=400, detail="Failed to create mortgage record.")

    return created_mortgage 

@router.get("/api/mortgages/", response_model=List[schemas.MortgageResponse], status_code=status.HTTP_200_OK)
def list_mortgages(db: Session = Depends(get_db)):

    mortgages = crud.get_mortgages(db)  
    if not mortgages:
        raise HTTPException(status_code=404, detail="No mortgage records found.")
    return mortgages 