import uuid
from sqlalchemy import CHAR, Column, Integer, Float, String
from .database import Base
from sqlalchemy.dialects.postgresql import UUID

class Mortgage(Base):
    __tablename__ = "mortgages"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))   
    creditScore = Column(Integer, nullable=False)
    loanAmount = Column(Float, nullable=False)
    propertyValue = Column(Float, nullable=False)
    annualIncome = Column(Float, nullable=False)
    debtAmount = Column(Float, nullable=False)
    loanType = Column(String(50), nullable=False)
    propertyType = Column(String(50), nullable=False)
    creditRating = Column(String(10))  # Placeholder logic