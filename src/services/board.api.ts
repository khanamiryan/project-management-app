import { api } from './api';
import { Board, IColumn } from 'types/types';
import jwt_decode from 'jwt-decode';
import { token } from './api';

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

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

export const boardApi = api.injectEndpoints({
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
      query: (idBoard) => ({
        url: `${Endpoint.BOARDS}${idBoard}/columns`,
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
    addColumn: builder.mutation<IColumn, Omit<IColumn, '_id'>>({
      query: (columnData) => ({
        url: `${Endpoint.BOARDS}${temporaryBoardId}${Endpoint.COLUMNS}`,
        method: HTTPMethod.POST,
        body: { title: columnData.title, order: columnData.order },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    deleteColumn: builder.mutation<IColumn, string>({
      query: (idColumn) => ({
        url: `${Endpoint.BOARDS}${temporaryBoardId}${Endpoint.COLUMNS}${idColumn}`,
        method: HTTPMethod.DELETE,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    updateColumn: builder.mutation<IColumn, Omit<IColumn, 'boardId'>>({
      query: (columnData) => ({
        url: `${Endpoint.BOARDS}${columnData._id}/${Endpoint.COLUMNS}${columnData._id}`,
        method: HTTPMethod.PUT,
        body: { title: columnData.title, order: columnData.order },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddColumnMutation,
  useDeleteColumnMutation,
  useGetColumnsQuery,
  useUpdateColumnMutation,
  useGetBoardsQuery,
} = boardApi;
