import { ErrorSeverity } from 'features/error/ApplicationError';
import { setError as setAppError } from 'features/error/errorSlice';
import store from 'store/store';

export const showAlert = (message: string, severity: ErrorSeverity = ErrorSeverity.ERROR) => {
    store.dispatch(setAppError({message, severity}));
}

export const showAlertAndLog = (error: Error ) => {
    console.error(error);
    store.dispatch(setAppError({message: error.message, severity: ErrorSeverity.ERROR}));
}