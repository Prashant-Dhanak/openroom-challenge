// src/features/applicationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Application } from '../interfaces/Application';
import { mapJsonToApplication } from '../helpers/mapJsonToApplication';

interface ApplicationState {
  applications: Application[];
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  loading: false,
  error: null,
};



// Async thunk to fetch applications from API
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/applications/');
      return response.data.map(mapJsonToApplication);
    } catch (error) {
      return rejectWithValue('Failed to fetch applications');
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action: PayloadAction<Application[]>) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default applicationSlice.reducer;
