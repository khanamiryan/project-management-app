import { api } from './api';
import { IColumn } from 'types/types';
import { Endpoint, HTTPMethod } from './api.constants';

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
      query: ({ boardId, ...rest }) => ({
        url: `${Endpoint.BOARDS}${boardId}/${Endpoint.COLUMNS}`,
        method: HTTPMethod.POST,
        body: { ...rest },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    deleteColumn: builder.mutation<IColumn, Omit<IColumn, 'title' | 'order'>>({
      query: ({ boardId, _id }) => ({
        url: `${Endpoint.BOARDS}${boardId}/${Endpoint.COLUMNS}${_id}`,
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
} = boardApi;
