import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "store/store";
import { ApplicationError, ErrorSeverity } from './ApplicationError';

export type ErrorState = {
    message: string | null;
    severity: ErrorSeverity | null;
    parameters: object | null;
};

const initialState: ErrorState = {
    message: null,
    severity: null,
    parameters: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ApplicationError | null>) => {
        state.message = null;
        state.severity = null;
        state.parameters = null;

        let error;
        if((error = action.payload) !== null) {
            state.message = error.message;
            state.severity = error.severity;
        }
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
        state.message = action.payload;
    },
    setSeverity: (state, action: PayloadAction<ErrorSeverity>) => {
        state.severity = action.payload;
    },
    setParams: (state, action: PayloadAction<object | null>) => {
        state.parameters = action.payload;
    }
  },
});

export const { setError, setErrorMessage, setSeverity, setParams } = errorSlice.actions;
export const selectErrorSeverity = (state: RootState) => state.error.severity;
export const selectErrorMessage = (state: RootState) => state.error.message;
export const selectErrorParameters = (state: RootState) => state.error.parameters;

export default errorSlice.reducer;