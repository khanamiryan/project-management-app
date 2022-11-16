import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueries } from '@testing-library/react';
import jwt_decode from 'jwt-decode';
import { Board, IColumn, ITask } from 'types/types';

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

const BASE_URL = 'http://localhost:3000/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNkMDc0OTYyNzRiZWJmNzYwYTA3MCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg1Mzg4NTUsImV4cCI6MTY2ODU4MjA1NX0.-f3YCUR3V7nehYxhWxIYkYGtirNspuYb84RSNqS6FiA';
const temporaryBoardId = '636cd10e96274bebf760a073/';
const decodedToken: DecodedToken = jwt_decode(token);

enum Endpoint {
  BOARDS = 'boards/', /// могут быть query параметры лучше добавлять в начале /
  BOARDS_SET = 'boardsSet/',
  COLUMNS = 'columns/',
}

enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
}

export const apiBoard = createApi({
  reducerPath: 'apiBoard',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${token}`);
    },
  }),
  tagTypes: ['Boards', 'Columns'],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], string>({
      query: () => ({
        url: Endpoint.BOARDS,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Boards' as const, _id })), // откуда берется тип result (что такое as const)
              { type: 'Boards', id: 'LIST' }, /// что такое лист
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    getColumns: builder.query<IColumn[], string>({
      query: (id) => ({
        url: `${Endpoint.BOARDS}${id}/columns`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Columns' as const, _id })),
              { type: 'Columns', id: 'LIST' }, /// ???
            ]
          : [{ type: 'Columns', id: 'LIST' }], /// ???
    }),
    addColumn: builder.mutation<IColumn, Omit<IColumn, '_id' | 'boardId'>>({
      query: (columnData) => ({
        url: `${Endpoint.BOARDS}${temporaryBoardId}${Endpoint.COLUMNS}`,
        method: HTTPMethod.POST,
        body: { ...columnData },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    deleteColumn: builder.mutation<IColumn, string>({
      query: (id) => ({
        url: `${Endpoint.BOARDS}${temporaryBoardId}${Endpoint.COLUMNS}${id}`,
        method: HTTPMethod.DELETE,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetColumnsQuery,
  useAddColumnMutation,
  useDeleteColumnMutation,
} = apiBoard;
