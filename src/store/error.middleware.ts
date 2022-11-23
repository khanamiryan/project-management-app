import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

import { api as queryApi } from '../services/api';
import { signOutReducer } from './userSlice';

export const rtkErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 'FETCH_ERROR') {
      console.info(action.payload.error);
      console.log('There is no server, in the future may be implement some error showing');
    }

    if (action.payload.status === 403 && action.payload.data.statusCode === 403) {
      api.dispatch(signOutReducer());
      api.dispatch(queryApi.util.resetApiState());
    }
  }
  return next(action);
};
