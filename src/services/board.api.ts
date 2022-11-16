import { api } from './api';
import { Board, IColumn } from 'types/types';
import { Endpoint, HTTPMethod } from './api.constants';

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], string>({
      query: () => ({
        url: Endpoint.BOARDS,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Boards' as const, _id })), // откуда берется тип result (что такое as const)
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    getColumns: builder.query<IColumn[], string>({
      query: (idBoard) => ({
        url: `${Endpoint.BOARDS}${idBoard}/columns`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Columns' as const, _id })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),
    addColumn: builder.mutation<IColumn, Omit<IColumn, '_id'>>({
      query: (columnData) => ({
        url: `${Endpoint.BOARDS}${columnData.boardId}/${Endpoint.COLUMNS}`,
        method: HTTPMethod.POST,
        body: { title: columnData.title, order: columnData.order },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    deleteColumn: builder.mutation<IColumn, Omit<IColumn, 'title' | 'order'>>({
      query: (columnData) => ({
        url: `${Endpoint.BOARDS}${columnData.boardId}/${Endpoint.COLUMNS}${columnData._id}`,
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
