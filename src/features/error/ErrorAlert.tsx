import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import useError from 'hooks/useError';
import { ErrorSeverity } from './ApplicationError';
import { useTranslation } from 'react-i18next';

const ErrorAlert = () => {
  const { t } = useTranslation();
  const { errorMessage, errorSeverity, errorParams, clearAppError } = useError();

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    clearAppError();
  };

  return (
    <Snackbar
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      open={!!errorMessage}
      autoHideDuration={5000}
      onClose={handleClose}
      sx={{ width: '400px' }}
    >
      <Alert
        onClose={handleClose}
        severity={errorSeverity ?? ErrorSeverity.ERROR}
        sx={{ width: '100%' }}
      >
        {errorMessage ? t(errorMessage, { ...errorParams }) : null }
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;