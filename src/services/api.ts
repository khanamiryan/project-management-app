import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';
import { BASE_URL } from './api.constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).user;
      headers.set('authorization', `Bearer ${token}`);
    },
  }),
  tagTypes: ['Boards', 'Columns', 'Tasks'],
  endpoints: () => ({}),
});
