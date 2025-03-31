from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from . import models, schemas


from .database import get_db
from . import schemas, crud
from fastapi import status
from typing import List

router = APIRouter()

@router.post("/api/mortgages/", response_model=schemas.MortgageResponse , status_code=status.HTTP_201_CREATED)
def add_mortgage(mortgage: schemas.MortgageCreate, db: Session = Depends(get_db)):
    created_mortgage = crud.post_mortgage(db, mortgage)
    
    if not created_mortgage:
        raise HTTPException(status_code=400, detail="Failed to create mortgage record.")

    return created_mortgage 

@router.get("/api/mortgages/", response_model=List[schemas.MortgageResponse], status_code=status.HTTP_200_OK)
def list_mortgages(db: Session = Depends(get_db)):

    mortgages = crud.get_mortgages(db)  
    if not mortgages:
        raise HTTPException(status_code=404, detail="No mortgage records found.")
    return mortgages

@router.put("/api/mortgages/{mortgage_id}", response_model=schemas.MortgageResponse)
def update_mortgage(mortgage_id: str, mortgage_update: schemas.MortgageBase, db: Session = Depends(get_db)):
    existing_mortgage = crud.get_mortgage_by_id(db, mortgage_id)

    if not existing_mortgage:
        raise HTTPException(status_code=404, detail="Mortgage record not found.")

    updated_mortgage = crud.update_mortgage(db, mortgage_id, mortgage_update)

    if not updated_mortgage:
        raise HTTPException(status_code=400, detail="Failed to update mortgage record.")

    return updated_mortgage

@router.delete("/api/mortgages/{mortgage_id}", response_class=Response, status_code=status.HTTP_200_OK)
def delete_mortgage(mortgage_id: str, db: Session = Depends(get_db)):
    mortgage = db.query(models.Mortgage).filter(models.Mortgage.id == mortgage_id).first()

    if not mortgage:
        raise HTTPException(status_code=404, detail="Mortgage record not found.")

    db.delete(mortgage)
    db.commit()

    return Response(content='{"message": "Mortgage record deleted successfully"}', media_type="application/json")