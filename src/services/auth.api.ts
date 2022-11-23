import { api } from './api';
import { Endpoint, HTTPMethod } from './api.constants';
import jwt_decode from 'jwt-decode';
import { usersApi } from './users.api';
import { DecodedToken, ISignInForm, ISignUpForm, IUserResponse } from '../types/types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signInUser: builder.mutation<{ token: string }, ISignInForm>({
      query: (user) => ({
        url: `${Endpoint.AUTH}signin`,
        method: HTTPMethod.POST,
        body: user,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { id, exp } = jwt_decode(data.token) as DecodedToken;
          localStorage.setItem('token', data.token);
          // console.log(jwt_decode(data.token) as DecodedToken);
          // console.log(exp > Date.now() / 1000);
          await dispatch(usersApi.endpoints.getUser.initiate(id));
        } catch (error) {}
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    signUpUser: builder.mutation<IUserResponse, ISignUpForm>({
      query: (user) => ({
        url: `${Endpoint.AUTH}signup`,
        method: HTTPMethod.POST,
        body: user,
      }),
      async onQueryStarted({ login, password }, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        if (data._id) {
          await dispatch(authApi.endpoints.signInUser.initiate({ login, password }));
        }
      },
    }),
  }),
});

export const { useSignInUserMutation, useSignUpUserMutation } = authApi;
