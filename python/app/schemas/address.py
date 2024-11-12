from pydantic import BaseModel
from typing import Optional
from app.enums import ProvinceEnum

class AddressBase(BaseModel):
    unit_number: Optional[str] = None
    street_number: Optional[int] = None
    street_name: Optional[str] = None
    po_box: Optional[str] = None
    city: Optional[str] = None
    province: ProvinceEnum
    postal_code: Optional[str] = None

    class Config:
        orm_mode = True
