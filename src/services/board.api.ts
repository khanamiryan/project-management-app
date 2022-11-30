import { api } from './api';
import { IColumn, ITask } from 'types/types';
import { Endpoint, HTTPMethod } from './api.constants';

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], string>({
      query: (columnsIdList) => ({
        url: `${Endpoint.TASKS_SET}?ids=${columnsIdList}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    /*getTasksByColumn: builder.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `${Endpoint.BOARDS}${boardId}/columns/${columnId}/tasks`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    getTasksSetByColumnIds: builder.query<ITask[], string>({
      query: (columnsIdList) => ({
        url: `${Endpoint.TASKS_SET}?ids=${columnsIdList}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),*/
    getTasksByBoardId: builder.query<ITask[], string>({
      query: (boardId) => ({
        url: `${Endpoint.TASKS_SET}/${boardId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTasksSet: builder.mutation<
      ITask[],
      { set: Pick<ITask, '_id' | 'order' | 'columnId'>[]; boardId: string }
    >({
      query: ({ set, boardId }) => ({
        url: Endpoint.TASKS_SET,
        method: HTTPMethod.PATCH,
        body: set,
      }),

      async onQueryStarted({ boardId, set }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardApi.util.updateQueryData('getTasksByBoardId', boardId, (draft) => {
            const newArr = draft.map((item) => {
              const task = set.find((newTask) => {
                if (newTask._id === item._id) {
                  return item;
                } else {
                  return false;
                }
              });
              if (task) {
                item.order = task.order;
                item.columnId = task?.columnId;
                return item;
              } else {
                return item;
              }
            });
            Object.assign(draft, newArr);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          console.log('catch from optimitstic');
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    addTask: builder.mutation<ITask, Omit<ITask, '_id'>>({
      query: ({ boardId, columnId, ...rest }) => ({
        url: `${Endpoint.BOARDS}${boardId}/columns/${columnId}/tasks`,
        method: HTTPMethod.POST,
        body: { ...rest },
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTask: builder.mutation<ITask, ITask>({
      query: ({ boardId, columnId, _id, ...rest }) => ({
        url: `${Endpoint.BOARDS}${boardId}/columns/${columnId}/tasks/${_id}`,
        method: HTTPMethod.PUT,
        body: { columnId: columnId, ...rest },
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    deleteTask: builder.mutation<
      ITask,
      Omit<ITask, 'title' | 'order' | 'description' | 'userId' | 'users'>
    >({
      query: ({ boardId, columnId, _id }) => ({
        url: `${Endpoint.BOARDS}${boardId}/columns/${columnId}/tasks/${_id}`,
        method: HTTPMethod.DELETE,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    getColumns: builder.query<IColumn[], string>({
      query: (boardId) => ({
        url: `${Endpoint.BOARDS}${boardId}/columns`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Columns' as const, _id })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),
    updateColumnsSet: builder.mutation<
      IColumn[],
      { set: Pick<IColumn, '_id' | 'order'>[]; boardId: string }
    >({
      query: ({ set, boardId }) => ({
        url: Endpoint.COLUMNS_SET,
        method: HTTPMethod.PATCH,
        body: set,
      }),
      async onQueryStarted({ boardId, set }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardApi.util.updateQueryData('getColumns', boardId, (draft) => {
            const newArr = draft.map((item) => {
              const column = set.find((newColumn) => {
                if (newColumn._id === item._id) {
                  return item;
                } else {
                  return false;
                }
              });
              if (column) {
                item.order = column.order;
                return item;
              } else {
                return item;
              }
            });
            console.log(newArr.length);
            Object.assign(draft, draft);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          console.log('catch from optimitstic');
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    addColumn: builder.mutation<IColumn, Omit<IColumn, '_id'>>({
      query: ({ boardId, ...rest }) => ({
        url: `${Endpoint.BOARDS}${boardId}/${Endpoint.COLUMNS}`,
        method: HTTPMethod.POST,
        body: { ...rest },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    deleteColumn: builder.mutation<IColumn, Pick<IColumn, 'boardId' | '_id'>>({
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
  useUpdateColumnsSetMutation,
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksByBoardIdQuery,
  useUpdateTaskMutation,
  useUpdateTasksSetMutation,
  //useGetTasksByColumnQuery,
} = boardApi;
/*
const api11 = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: ['Post'],
    }),
    updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPost', id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();


        }
      },
    }),
  }),
});
*/
