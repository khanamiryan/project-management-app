import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import jwt_decode from 'jwt-decode';
import { Board, IColumn } from 'types/types';

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

const BASE_URL = 'http://localhost:3000/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNkMDc0OTYyNzRiZWJmNzYwYTA3MCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg1ODUxMDEsImV4cCI6MTY2ODYyODMwMX0.ItAlUUc_Ah6lqpVDnHBByy-FnLEZ00EcSlcYDxkPzIU';
const temporaryBoardId = '636cd10e96274bebf760a073/';
const decodedToken: DecodedToken = jwt_decode(token);
enum Endpoint {
  BOARDS = 'boards/',
  BOARDS_SET = 'boardsSet/',
  COLUMNS = 'columns/',
}

enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
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
    updateColumn: builder.mutation<IColumn, Omit<IColumn, 'boardId'>>({
      query: (columnData) => ({
        url: `${Endpoint.BOARDS}${temporaryBoardId}${Endpoint.COLUMNS}${columnData._id}`,
        method: HTTPMethod.PUT,
        body: { title: columnData.title, order: columnData.order },
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
  useUpdateColumnMutation,
} = apiBoard;
