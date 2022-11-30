import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { showToast } from './toastSlice';
import { signOut } from '../utils/signOut';

export const rtkErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 'FETCH_ERROR') {
      api.dispatch(showToast({ message: action.payload.error }));
    }
    if (action.payload.status === 403 && action.payload.data.statusCode === 403) {
      signOut(api.dispatch);
      api.dispatch(showToast({ message: 'token.expired' }));
    }
  }
  return next(action);
};
