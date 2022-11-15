import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board } from 'types/types';
import jwt_decode from 'jwt-decode';

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};
const BASE_URL = 'http://localhost:3000/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNkMDc0OTYyNzRiZWJmNzYwYTA3MCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg0OTUxNzksImV4cCI6MTY2ODUzODM3OX0.UnwKv3tMhiYa_4792uM1YQhQz6-vswTgP27ehZX_21s';
const decodedToken: DecodedToken = jwt_decode(token);

enum Endpoint {
  BOARDS = 'boards/',
  BOARDS_SET = 'boardsSet/',
}

enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
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
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardsSetByUserIdQuery,
  useDeleteBoardMutation,
  useCreateBoardMutation,
} = api;
