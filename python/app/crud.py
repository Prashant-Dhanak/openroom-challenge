from app.enums.status import StatusEnum
from sqlmodel import Session, select
from app.models import Application, Address
from app.schemas import ApplicationCreate, ApplicationUpdate, AddressBase

# Function to create a application along with their address
def create_application(db: Session, application_data: ApplicationCreate, isSubmission: False):
    # Step 1: Create the Application instance
    application = Application(
        first_name=application_data.first_name,
        middle_name=application_data.middle_name,
        last_name=application_data.last_name,
        age=application_data.age,
        sex=application_data.sex,
        date_of_birth=application_data.date_of_birth,
        license_number=application_data.license_number,
        height=application_data.height,
        status=StatusEnum.Submitted if isSubmission else StatusEnum.InProgress,
        is_deleted=False  # Default to False for new applications
    )
    db.add(application)
    db.commit()
    db.refresh(application)  # Ensure the `id` is populated

    # Step 2: Create the Address if provided
    if application_data.address:
        address_data = application_data.address.dict()
        new_address = Address(**address_data, application_id=application.id)
        db.add(new_address)
        db.commit()
        db.refresh(new_address)
    
    # Step 3: Refresh application to include address relationship
    db.refresh(application)
    return application


def get_application(db: Session, application_id: int) -> Application:
    statement = select(Application).filter(Application.id == application_id)
    result = db.execute(statement)
    application = result.scalars().first()  # Use scalars() to fetch the results
    return application 

def get_all_applications(db: Session):
    statement = select(Application).filter(Application.is_deleted == False)
    result = db.execute(statement)
    applications = result.scalars().all()  # Use scalars() to fetch the results
    return applications 

# Function to update a application
def update_application(db: Session, application_id: int, application_data: ApplicationUpdate, isSubmission: False):
    # Fetch the application with the specified application_id
    statement = select(Application).filter(
        Application.id == application_id,
        Application.is_deleted == False
    )
    result = db.execute(statement)
    application = result.scalars().first()
    
    if application:
        # Update fields in the Application model
        for key, value in application_data.dict(exclude_unset=True).items():
            if key == "address" and value is not None:
                update_or_create_address(db, application_id, value)  # Handle address update
            else:
                setattr(application, key, value)
        application.status=StatusEnum.Submitted if isSubmission else StatusEnum.InProgress
        db.commit()
        db.refresh(application)
        return application
    
    return None

def update_or_create_address(db: Session, application_id: int, address_data: AddressBase):
    # Fetch the existing address associated with this 
    statement = select(Address).filter(Address.application_id == application_id)
    result = db.execute(statement)
    address = result.scalars().first()
    new_address = Address()

    if address:
        # Update existing address fields
        for key, value in address_data.items():
            setattr(address, key, value)
    else:
        # If no address exists, create a new address and associate it with the application_id
        new_address = Address(application_id=application_id, **address_data.dict())
        db.add(new_address)
    
    db.commit()
    if address:
        db.refresh(address)
    else:
        db.refresh(new_address)

# Function to delete a application (soft delete by setting is_deleted to True)
def delete_application(db: Session, application_id: int):
    statement = select(Application).filter(Application.id == application_id)
    result = db.execute(statement)
    application = result.scalars().first()
    
    if application:
        application.is_deleted = True
        db.commit()
        db.refresh(application)
        return application
    return None

# Function to change status to "Submitted" for a application by ID
def submit_application(db: Session, application_id: int):
    # Select the application by ID
    statement = select(Application).filter(Application.id == application_id)
    result = db.execute(statement)
    application = result.scalars().first()
    
    # If application is found, update the status
    if application:
        application.status = "Submitted"  # Set status to "Submitted"
        db.commit()
        db.refresh(application)  # Refresh to get the updated data
        return application
    return None
