import { IUserInfo, IUserResponse } from 'types/types';
import { api } from './api';
import { Endpoint, HTTPMethod } from './api.constants';
import { signOutReducer } from '../store/userSlice';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUserResponse[], string>({
      query: () => ({
        url: Endpoint.USERS,
      }),
    }),

    getUser: builder.query<IUserInfo, string>({
      query: (id) => ({
        url: `${Endpoint.USERS}${id}`,
      }),
      providesTags: [{ type: 'Users', id: 'LIST' }],
      transformResponse: ({ _id, ...rest }: IUserResponse) => {
        return { ...rest, id: _id };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          console.log('may be here we need to catch expired token ');
          console.log(e);
        }
      },
    }),

    setUserInfo: builder.mutation<IUserResponse, IUserInfo>({
      query: ({ id, ...user }) => ({
        url: `${Endpoint.USERS}${id}`,
        method: HTTPMethod.PUT,
        body: user,
      }),
      // invalidatesTags: [{ type: 'Users', id: 'LIST' }], //todo optimistic query

      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUser', id, (draft) => {
            console.log('draft and patch', draft, patch);
            //need to understand why not updates the state
            //it's should work, if we find the way get rid of user state or do really sync of state and cache.
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
          // dispatch();
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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(api.util.resetApiState());
            dispatch(signOutReducer());
          }
        } catch {
          console.log('Unknown error with user delete');
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation, useSetUserInfoMutation } =
  usersApi;
