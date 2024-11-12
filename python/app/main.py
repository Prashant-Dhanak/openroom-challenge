from typing import List
from app import crud, schemas
from app.schemas.application import Application, ApplicationCreate, ApplicationUpdate
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session
from app.database import reset_db, get_db

app = FastAPI()

# Define the origins that are allowed to make requests to this API.
origins = [
    "http://localhost:3000",  # React development server
    "http://127.0.0.1:3000",
    "http://192.168.2.16:3000",
    # You can add other origins as needed, e.g., a production origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows only specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

reset_db()

# Endpoint to get all applications
@app.get("/applications/", response_model=List[Application])
def get_all_applications(db: Session = Depends(get_db)):
    applications = crud.get_all_applications(db)
    return applications


# Endpoint to get a application by ID
@app.get("/applications/{application_id}/", response_model=Application)
def get_application(application_id: int, db: Session = Depends(get_db)):
    application = crud.get_application(db, application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return application


# Endpoint to create a application
@app.post("/applications/", response_model=Application)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    return crud.create_application(db, application, False)


# Endpoint to update a application
@app.put("/applications/{application_id}/", response_model=Application)
def update_application(application_id: int, application: ApplicationUpdate, db: Session = Depends(get_db)):
    updated_application = crud.update_application(db, application_id, application, isSubmission=False)
    if updated_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return updated_application


# Endpoint to delete a application (soft delete)
@app.delete("/applications/{application_id}/", response_model=Application)
def delete_application(application_id: int, db: Session = Depends(get_db)):
    deleted_application = crud.delete_application(db, application_id)
    if deleted_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return deleted_application

# Endpoint to change the status to "Submitted"
@app.put("/applications/submit/{application_id}/", response_model=Application)
def submit_application(application: ApplicationUpdate, db: Session = Depends(get_db)):
    # Call the CRUD function to update the status
    if(application.id == 0):
        application = crud.create_application(db, application, True)
    else:
        application = crud.update_application(db, application.id, application, isSubmission=True)
    if application is None:
        raise HTTPException(status_code=404, detail="Person not found")
    return application