import { User } from 'types/types';
import { api, Endpoint } from './api';

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
