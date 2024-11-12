# app/models/application.py
import re
from app.enums.status import StatusEnum
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import date
from pydantic import field_validator

# Import the SexEnum
from app.enums import SexEnum

class Application(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    sex: SexEnum
    date_of_birth: date
    license_number: str = Field(default=None, index=True)
    height: Optional[int] = None  # New height field
    is_deleted: bool = Field(default=False)  # Soft delete flag
    status: StatusEnum  # Capitalized StatusEnum for the status field

    # Use lazy import by referencing the class name as a string
    address: Optional["Address"] = Relationship(back_populates="application")

