import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import jwt_decode from 'jwt-decode';
import { Board } from 'types/types';

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};
const BASE_URL = 'http://localhost:3000/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNkMDc0OTYyNzRiZWJmNzYwYTA3MCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg0MzQzODEsImV4cCI6MTY2ODQ3NzU4MX0.Mums_mazx3pYqqJ2iJR4FNFhJR515B1xSR3boIA-bvs';
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
const decodedToken: DecodedToken = jwt_decode(token);

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], string>({
      query: () => ({
        url: Endpoint.BOARDS,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    deleteBoard: builder.mutation<Board, string>({
      query: (id) => ({
        url: `${Endpoint.BOARDS}${id}`,
        method: HTTPMethod.DELETE,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    createBoard: builder.mutation<Board, Omit<Board, '_id' | 'owner'>>({
      query: (boardData) => {
        console.log(JSON.stringify({ ...boardData, owner: decodedToken.id }));
        return {
          url: `${Endpoint.BOARDS}`,
          method: HTTPMethod.POST,
          headers: { Authorization: `Bearer ${token}` },
          body: { ...boardData, owner: decodedToken.id },
        };
      },
    }),
    getBoardsSetByUserId: builder.query<Board[], string>({
      query: () => ({
        url: `${Endpoint.BOARDS_SET}${decodedToken.id}`,
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
} = api;
