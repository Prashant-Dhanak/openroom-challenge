from sqlmodel import SQLModel, Session, create_engine
from app.models import Application, Address
from datetime import date
from app.enums import SexEnum, ProvinceEnum, StatusEnum

sqlite_url = "sqlite:///./database.db"
engine = create_engine(sqlite_url)

# Function to get a new session
def get_db():
    db = Session(bind=engine)
    try:
        yield db  # This will yield the session to the FastAPI routes
    finally:
        db.close()  # Close the session after the request is finished

# Create tables in the database
def create_db():
    SQLModel.metadata.create_all(bind=engine)
    add_sample_data()

# Drop all tables and recreate
def reset_db():
    SQLModel.metadata.drop_all(bind=engine)
    SQLModel.metadata.create_all(bind=engine)
    add_sample_data()

# Function to add sample data
def add_sample_data():
    with Session(engine) as session:
        # Check if there are existing applications; if not, add sample data
        if session.query(Application).count() == 0:
            application1 = Application(
                first_name="John",
                middle_name="Doe",
                last_name="Smith",
                age=30,
                sex=SexEnum.male,
                date_of_birth=date(1993, 1, 1),
                license_number="OntarioLicense001",
                status=StatusEnum.InProgress,
            )

            address1 = Address(
                unit_number="101",
                street_number=123,
                street_name="Main St",
                po_box=None,
                city="Toronto",
                province=ProvinceEnum.Ontario,
                postal_code="M1A 1A1",
                application=application1  # Link the address to the application
            )

            application1.address = address1  # Link address to the application

            session.add(application1)
            session.commit()

            application2 = Application(
                first_name="Jane",
                middle_name="Marie",
                last_name="Doe",
                age=28,
                sex=SexEnum.female,
                date_of_birth=date(1995, 5, 15),
                license_number="OntarioLicense002",
                status=StatusEnum.InProgress,
            )

            address2 = Address(
                unit_number="202",
                street_number=456,
                street_name="Queen St",
                po_box=None,
                city="Ottawa",
                province=ProvinceEnum.Ontario,
                postal_code="K1A 0B1",
                application=application2  # Link the address to the application
            )

            application2.address = address2  # Link address to the application

            session.add(application2)
            session.commit()

        session.commit()

