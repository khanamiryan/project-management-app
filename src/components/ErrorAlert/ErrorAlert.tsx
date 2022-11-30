import CachedIcon from '@mui/icons-material/Cached';
import { Alert, IconButton } from '@mui/material';
import React from 'react';
import { t } from 'i18next';

const ErrorAlert = () => {
  return (
    <Alert variant="outlined" severity="error" sx={{ alignItems: 'center' }}>
      {t('boards.serverError')}{' '}
      {
        <IconButton onClick={() => window.location.reload()}>
          <CachedIcon fontSize="large" />
        </IconButton>
      }
    </Alert>
  );
};

export default ErrorAlert;
