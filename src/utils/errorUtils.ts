import { ErrorSeverity } from 'features/error/ApplicationError';
import { setError as setAppError } from 'features/error/errorSlice';
import store from 'store/store';

export const showError = (message: string, severity: ErrorSeverity = ErrorSeverity.ERROR) => {
    store.dispatch(setAppError({message, severity}));
}

export const showAndLogError = (message: string, error: Error ) => {
    console.error(error);
    store.dispatch(setAppError({message, severity: ErrorSeverity.ERROR}));
}