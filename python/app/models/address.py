# app/models/address.py
from pydantic import field_validator
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from app.enums import ProvinceEnum
import re

# Define the Address model
class Address(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    unit_number: Optional[str] = None
    street_number: Optional[int] = None
    street_name: Optional[str] = None
    po_box: Optional[str] = None
    city: Optional[str] = None
    province: ProvinceEnum
    postal_code: Optional[str] = None
    
    # Use lazy import by referencing the class name as a string
    application_id: Optional[int] = Field(default=None, foreign_key="application.id")
    application: Optional["Application"] = Relationship(back_populates="address")

    @field_validator('postal_code')
    def validate_postal_code(cls, value):
        if value and not re.match(r'^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$', value):
            raise ValueError('Invalid postal code. Please enter a valid Canadian postal code (e.g., A1A 1A1).')
        return value
