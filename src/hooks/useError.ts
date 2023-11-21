import { useDispatch, useSelector } from 'react-redux';
import { setError as setAppError, setErrorMessage as setAppErrorMessage, setSeverity as setAppErrorSeverity, setParams as setAppErrorParams, selectErrorMessage, selectErrorSeverity, selectErrorParameters } from 'features/error/errorSlice';
import { ApplicationError, ErrorSeverity } from 'features/error/ApplicationError';

const useError = () => {
  const dispatch = useDispatch();

  const errorMessage = useSelector(selectErrorMessage);
  const errorSeverity = useSelector(selectErrorSeverity);
  const errorParams = useSelector(selectErrorParameters);

  const setError = (error: ApplicationError) => {
    dispatch(setAppError(error));
  };

  const setErrorMessage = (message: string) => {
    dispatch(setAppErrorMessage(message));
  };

  const setErrorSeverity = (severity: ErrorSeverity) => {
    dispatch(setAppErrorSeverity(severity));
  };

  const setErrorParams = (params: object) => {
    dispatch(setAppErrorParams(params));
  };

  const clearAppError = () => {
    dispatch(setAppError(null));
  };

  return {
    errorMessage,
    errorSeverity,
    errorParams,
    setError,
    setErrorMessage,
    setErrorSeverity,
    setErrorParams,
    clearAppError,
  };
};

export default useError;