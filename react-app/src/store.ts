// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import applicationListReducer from './features/applicationListSlice';
import applicationReducer from './features/applicationSlice';

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    applicationList: applicationListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  // <-- This line defines AppDispatch type
