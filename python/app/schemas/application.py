from app.enums.status import StatusEnum
from app.schemas.address import AddressBase
from pydantic import BaseModel
from datetime import date
from typing import Optional
from app.enums import SexEnum, ProvinceEnum
from app.models.address import Address

class ApplicationBase(BaseModel):
    id: Optional[int]
    first_name: str
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    sex: SexEnum
    height: Optional[int] = None
    date_of_birth: date
    license_number: str
    status: StatusEnum  # Capitalized StatusEnum


class ApplicationCreate(ApplicationBase):
    address: AddressBase  # Nested Address for creation


class ApplicationUpdate(ApplicationBase):
    address: Optional[AddressBase] = None  # Address can be updated

    class Config:
        orm_mode = True


class Application(ApplicationBase):
    is_deleted: bool
    address: AddressBase

    class Config:
        orm_mode = True
