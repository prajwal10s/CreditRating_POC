from pydantic import BaseModel
from uuid import UUID

class MortgageBase(BaseModel):
    creditScore: int
    loanAmount: float
    propertyValue: float
    annualIncome: float
    debtAmount: float
    loanType: str
    propertyType: str

class MortgageCreate(MortgageBase):
    pass

class MortgageResponse(MortgageBase):
    id: UUID
    creditRating: str  
    #need to write the rating logic here

    class Config:
        orm_mode = True