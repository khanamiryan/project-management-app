import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './api.constants';
import { getToken } from '../utils/getToken';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Boards', 'Columns', 'Tasks', 'Users', 'Board'],
  endpoints: () => ({}),
});
