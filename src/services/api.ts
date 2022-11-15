import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board, User } from 'types/types';
import jwt_decode from 'jwt-decode';

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};
const BASE_URL = 'http://localhost:3000/';
const token =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzM5NGZmMGRlZmQxMTAzMmM3Mjg4MyIsImxvZ2luIjoiU3R1ZGVudDEiLCJpYXQiOjE2Njg1MTk0OTMsImV4cCI6MTY2ODU2MjY5M30.n_RAvkSf1EZYWLr_8PiMVCPciOx4ZAs2q5HEThf2H-I';
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNkMDc0OTYyNzRiZWJmNzYwYTA3MCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg0OTUxNzksImV4cCI6MTY2ODUzODM3OX0.UnwKv3tMhiYa_4792uM1YQhQz6-vswTgP27ehZX_21s';
export const decodedToken: DecodedToken = jwt_decode(token);

enum Endpoint {
  BOARDS = 'boards/',
  BOARDS_SET = 'boardsSet/',
  USERS = 'users/',
}

enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}
// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${token}`);
    },
  }),
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], string>({
      query: () => ({
        url: Endpoint.BOARDS,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Boards' as const, _id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    deleteBoard: builder.mutation<Board, string>({
      query: (id) => ({
        url: `${Endpoint.BOARDS}${id}`,
        method: HTTPMethod.DELETE,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    createBoard: builder.mutation<Board, Omit<Board, '_id' | 'owner'>>({
      query: (boardData) => {
        console.log(JSON.stringify({ ...boardData, owner: decodedToken.id }));
        return {
          url: `${Endpoint.BOARDS}`,
          method: HTTPMethod.POST,
          body: { ...boardData, owner: decodedToken.id },
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<Board, Board>({
      query: (board) => {
        const { _id, ...rest } = board;
        return {
          url: `${Endpoint.BOARDS}${_id}`,
          method: HTTPMethod.PUT,
          body: rest,
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    getBoardsSetByUserId: builder.query<Board[], string>({
      query: () => ({
        url: `${Endpoint.BOARDS_SET}${decodedToken.id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Boards' as const, _id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    getUsers: builder.query<User[], string>({
      query: () => ({
        url: Endpoint.USERS,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardsSetByUserIdQuery,
  useDeleteBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useGetUsersQuery,
} = api;
