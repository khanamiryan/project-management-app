import { User } from 'types/types';
import { api } from './api';
import { Endpoint, HTTPMethod } from './api.constants';
import {
  DecodedToken,
  ISignInForm,
  ISignUpForm,
  IUserInfo,
  IUserResponse,
  signOut,
} from '../store/userSlice';
import jwt_decode from 'jwt-decode';
import { IProfile } from '../components/Profile/Profile';

export const usersApi = api.injectEndpoints({
  // providesTags: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      query: () => ({
        url: Endpoint.USERS,
      }),
    }),

    getUser: builder.query<IUserInfo, string>({
      query: (id) => ({
        url: `${Endpoint.USERS}${id}`,
      }),
      providesTags: [{ type: 'Users', id: 'LIST' }],

      transformResponse: (response: IUserResponse, meta, arg) => {
        const { _id, ...rest } = response;
        return { ...rest, id: _id };
      },
    }),

    signInUser: builder.mutation<{ token: string }, ISignInForm>({
      query: (user) => ({
        url: `${Endpoint.AUTH}signin`,
        method: HTTPMethod.POST,
        body: user,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const id = (jwt_decode(data.token) as DecodedToken).id;
          localStorage.setItem('token', data.token);
          await dispatch(usersApi.endpoints.getUser.initiate(id));
        } catch (error) {}
      },
      invalidatesTags: ['Users'],
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
          await dispatch(usersApi.endpoints.signInUser.initiate({ login, password }));
        }
      },
    }),

    setUserInfo: builder.mutation<IUserResponse, IProfile & { id: string }>({
      query: ({ id, ...user }) => ({
        url: `${Endpoint.USERS}${id}`,
        method: HTTPMethod.PUT,
        body: user,
      }),
      invalidatesTags: ['Users'], //todo optimistic query

      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUser', id, (draft) => {
            console.log(draft, patch, 'fff');
            //need to understand why not updates the state
            //it's should work, if we find the way get rid of user state or do really sync of state and cache.
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${Endpoint.USERS}${id}`,
        method: HTTPMethod.DELETE,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch, getState }) {
        const { data } = await queryFulfilled;
        if (data) {
          console.log('deleted', data);
          localStorage.removeItem('token');
          dispatch(api.util.resetApiState());
          dispatch(signOut());
          //await dispatch(usersApi.endpoints.signInUser.initiate({ login, password }));
        }
      },
    }),
  }),
});

// export const signInService = async (user: ISignInForm) => {
//   const response = await authApi.post('auth/signin', user);
//   //////
//   addBearer(response.data.token); //definetly need to change the place
//   ///////
//   return response.data;
// };

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useSignInUserMutation,
  useSignUpUserMutation,
  useSetUserInfoMutation,
} = usersApi;
