// src/features/applicationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Application } from '../interfaces/Application';
import { mapApplicationToJson } from '../helpers/mapApplicationToJson';
import { mapJsonToApplication } from '../helpers/mapJsonToApplication';
import { StatusEnum } from '../enums/StatusEnum';
import { SexEnum } from '../enums/SexEnum';

interface ApplicationState {
  application: Application | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  application: null,
  loading: false,
  error: null,
};

// Async thunk for fetching an application by ID
export const fetchApplicationById = createAsyncThunk<Application, number>(
  'application/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/applications/${id}/`);
      return mapJsonToApplication(response.data);
    } catch (error) {
      return rejectWithValue('Failed to fetch application');
    }
  }
);

// Async thunk for creating an application
export const createApplication = createAsyncThunk<Application, Application>(
  'application/create',
  async (newApplication, { rejectWithValue }) => {
    try {
      const application = mapApplicationToJson(newApplication);
      const response = await axios.post(`http://127.0.0.1:8000/applications/`, application);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create application');
    }
  }
);

// Async thunk for updating an application
export const updateApplication = createAsyncThunk<Application, Application>(
  'application/update',
  async (updatedApplication, { rejectWithValue }) => {
    try {
      const application = mapApplicationToJson(updatedApplication);
      const response = await axios.put(
        `http://127.0.0.1:8000/applications/${updatedApplication.id}/`,
        application
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update application');
    }
  }
);

// Async thunk for submitting an application
export const submitApplication = createAsyncThunk<Application, Application>(
  'application/submit',
  async (submitApplication, { rejectWithValue }) => {
    try {
      const application = mapApplicationToJson(submitApplication);
      const response = await axios.put(
        `http://127.0.0.1:8000/applications/submit/${application.id}/`,
        application
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to submit application');
    }
  }
);

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    clearApplicationState: (state) => {
      state.application = {
          id: 0,
          first_name: '',
          middle_name: '',
          last_name: '',
          age: undefined,
          sex: SexEnum.Male,
          date_of_birth: (new Date()).toISOString().split('T')[0],
          license_number: '',
          status: StatusEnum.InProgress,
          height: 11,
        
          unit_number: '',
          street_number: undefined,
          street_name: '',
          po_box: '',
          city: '',
          province: 'Ontario',
          postal_code: '',
      };
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationById.fulfilled, (state, action: PayloadAction<Application>) => {
        state.application = action.payload;
        state.loading = false;
      })
      .addCase(fetchApplicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createApplication.fulfilled, (state, action: PayloadAction<Application>) => {
        state.application = action.payload;
      })
      .addCase(updateApplication.fulfilled, (state, action: PayloadAction<Application>) => {
        state.application = action.payload;
      });
  },
});

export const { clearApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
