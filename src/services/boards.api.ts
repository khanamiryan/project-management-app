import { Board } from 'types/types';
import { api, decodedToken, Endpoint, HTTPMethod } from './api';

export const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
    deleteBoard: builder.mutation<Board, string>({
      query: (id) => ({
        url: `${Endpoint.BOARDS}${id}`,
        method: HTTPMethod.DELETE,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    createBoard: builder.mutation<Board, Omit<Board, '_id' | 'owner'>>({
      query: (boardData) => ({
        url: `${Endpoint.BOARDS}`,
        method: HTTPMethod.POST,
        body: { ...boardData, owner: decodedToken.id },
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<Board, Board>({
      query: ({ _id, ...rest }) => ({
        url: `${Endpoint.BOARDS}${_id}`,
        method: HTTPMethod.PUT,
        body: rest,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardsSetByUserIdQuery,
  useDeleteBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
} = boardsApi;
