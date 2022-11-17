import React from 'react';
import './Toast.styles.scss';
import { Alert, Snackbar } from '@mui/material';
import { ToastState } from 'store/toastSlice';

const Toast = ({ open, message, type = 'error' }: ToastState) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      // onClose={onClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        // onClose={onClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
