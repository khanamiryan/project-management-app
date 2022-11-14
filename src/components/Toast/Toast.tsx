import React from 'react';
import './Toast.styles.scss';
import { Alert, AlertColor, Snackbar } from '@mui/material';

const Toast = ({
  open,
  onClose,
  children,
  type = 'error',
}: {
  open: boolean;
  onClose: () => void;
  children: string;
  type?: AlertColor;
}) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
