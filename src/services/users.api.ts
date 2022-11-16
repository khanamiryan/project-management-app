import { User } from 'types/types';
import { api } from './api';
import { Endpoint } from './api.constants';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      query: () => ({
        url: Endpoint.USERS,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = postApi;
