// src/pages/ApplicationForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { SexEnum } from '../enums/SexEnum';
import { Application } from '../interfaces/Application';
import { StatusEnum } from '../enums/StatusEnum';
import {
  fetchApplicationById,
  clearApplicationState,
  createApplication,
  updateApplication,
  submitApplication,
} from '../features/applicationSlice';
import NumberField from '../components/NumberField';
import { SelectField } from '../components/SelectField';
import { TextField } from '../components/TextField';
import { ProvinceEnum } from '../enums/ProvinceEnum';
import {
  validateFieldNotEmpty,
  validatePostalCode,
} from '../helpers/validations';

const initialValues: Application = {
  id: 0,
  first_name: '',
  middle_name: '',
  last_name: '',
  age: undefined,
  sex: undefined,
  date_of_birth: '',
  license_number: '',
  status: StatusEnum.InProgress,
  height: 11,

  unit_number: '',
  street_number: undefined,
  street_name: '',
  po_box: '',
  city: '',
  province: '',
  postal_code: '',
};

const ApplicationForm: React.FC = () => {
  const { action, id } = useParams<{ action: string; id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { application, loading } = useSelector(
    (state: RootState) => state.application
  );

  const [formValues, setFormValues] = useState<Application>(initialValues);
  const [isFormValid, setIsFormValid] = useState(false);
  const [triedToSubmit, setTriedToSubmit] = useState(false);

  useEffect(() => {
    if (action === 'edit' && id) {
      dispatch(fetchApplicationById(Number(id)));
    } else {
      dispatch(clearApplicationState());
    }
  }, [action, id, dispatch]);

  useEffect(() => {
    if (application) {
      setFormValues({ ...initialValues, ...application });
    }
  }, [application]);

  useEffect(() => {
    const isValid: boolean = !!(
      validateFieldNotEmpty(formValues.first_name) &&
      validateFieldNotEmpty(formValues.last_name) &&
      validateFieldNotEmpty(formValues.date_of_birth) &&
      validateFieldNotEmpty(formValues.street_name) &&
      validateFieldNotEmpty(formValues.city) &&
      validatePostalCode(formValues.postal_code)
    );
    setIsFormValid(isValid);
  }, [formValues]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]:
        name === 'height' || name === 'street_number'
          ? Number(value) || 0
          : value || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriedToSubmit(true);

    if (isFormValid === false) {
      return;
    }

    dispatch(submitApplication(formValues));

    navigate('/');
  };

  const handleSaveApplication = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields for creating an application
    if (!formValues.first_name.trim() || !formValues.last_name.trim()) {
      alert(
        'Both First Name and Last Name are required to create an application.'
      );
      return; // Stop the function if validation fails
    }

    if (id) {
      dispatch(updateApplication(formValues));
    } else {
      dispatch(createApplication(formValues));
    }

    navigate('/');
  };

  return (
    <div className="bg-gray-light min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-primary-dark mb-6">
          {action === 'create' ? 'Create Application' : 'Edit Application'}
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details Group */}
            <div className="group-container">
              <h2 className="group-title">Personal Details</h2>
              <TextField
                triedToSubmit={triedToSubmit}
                label="First Name"
                id="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
                required
              />
              <TextField
                triedToSubmit={triedToSubmit}
                label="Middle Name"
                id="middle_name"
                value={formValues.middle_name}
                onChange={handleInputChange}
              />
              <TextField
                triedToSubmit={triedToSubmit}
                label="Last Name"
                id="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
                required
              />
              <TextField
                triedToSubmit={triedToSubmit}
                label="Ontario License Number"
                id="license_number"
                value={formValues.license_number}
                onChange={handleInputChange}
              />
              <TextField
                triedToSubmit={triedToSubmit}
                label="Date of Birth"
                id="date_of_birth"
                type="date"
                value={formValues.date_of_birth}
                onChange={handleInputChange}
                required
              />
              <NumberField
                triedToSubmit={triedToSubmit}
                label="Height (cm)"
                id="height"
                type="number"
                value={formValues.height}
                onChange={handleInputChange}
              />
              <SelectField
                label="Sex"
                id="sex"
                value={formValues.sex}
                options={Object.values(SexEnum)}
                onChange={handleInputChange}
              />
            </div>

            {/* Address Information Group */}
            <div className="group-container">
              <h2 className="group-title">Address Information</h2>
              <div className="field-row">
                <div className="field-container">
                  <TextField
                    triedToSubmit={triedToSubmit}
                    label="Unit Number"
                    id="unit_number"
                    value={formValues.unit_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field-container">
                  <NumberField
                    triedToSubmit={triedToSubmit}
                    label="Street Number"
                    id="street_number"
                    type="number"
                    value={formValues.street_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <TextField
                triedToSubmit={triedToSubmit}
                label="Street Name"
                id="street_name"
                value={formValues.street_name}
                onChange={handleInputChange}
                required
              />
              <TextField
                triedToSubmit={triedToSubmit}
                label="PO Box"
                id="po_box"
                value={formValues.po_box}
                onChange={handleInputChange}
              />
              <TextField
                triedToSubmit={triedToSubmit}
                label="City"
                id="city"
                value={formValues.city}
                onChange={handleInputChange}
                required
              />
              <SelectField
                label="Province"
                id="province"
                value={formValues.province}
                options={Object.values(ProvinceEnum)}
                onChange={handleInputChange}
              />
              <TextField
                triedToSubmit={triedToSubmit}
                label="Postal Code"
                id="postal_code"
                validate={validatePostalCode}
                errorMessage="Please enter valid Postal Code"
                value={formValues.postal_code}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleSaveApplication}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
              >
                {action === 'create'
                  ? 'Create Application'
                  : 'Save Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
