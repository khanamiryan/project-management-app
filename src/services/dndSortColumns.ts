import { DragSourceMonitor } from 'react-dnd';
import { IColumn, ITask } from '../types/types';

//todo: refactor: add to onDeleteTask
export const getTasksAfterDelTask = (dataTasks: ITask[], removeTask: ITask) => {
  return dataTasks
    .filter((task) => task._id !== removeTask._id)
    .map((task) => {
      if (task.order < removeTask.order) {
        return { _id: task._id, order: task.order, columnId: task.columnId };
      } else {
        return { _id: task._id, order: task.order - 1, columnId: task.columnId };
      }
    });
};

//todo:  refactor:  if possible combine function dndUpdateColumns dndUpdateTasksInsideColumn
//todo: without monitor
export const dndUpdateColumns = (
  dataColumnDrag: IColumn,
  monitor: DragSourceMonitor<IColumn, unknown>,
  dataColumns: IColumn[] | undefined,
  updateColumnsSet: (data: { set: Pick<IColumn, '_id' | 'order'>[]; boardId: string }) => void
) => {
  interface IDropResult {
    dataColumn: typeof dataColumnDrag;
  }
  const dataColumnDrop = monitor.getDropResult<IDropResult>()?.dataColumn;
  if (dataColumnDrag && dataColumnDrop && dataColumnDrag._id !== dataColumnDrop._id) {
    const { order: orderDrag } = dataColumnDrag;
    const { order: orderDrop } = dataColumnDrop;
    const newDataColumnsPATCH = dataColumns
      ?.filter((item) => {
        if (
          (item.order >= orderDrag && item.order <= orderDrop) ||
          (item.order >= orderDrop && item.order <= orderDrag)
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((column) => {
        const { order, _id } = column;
        switch (order) {
          case orderDrag:
            return { order: orderDrop, _id: _id };
          case orderDrop:
            if (orderDrop > orderDrag) {
              return { order: orderDrop - 1, _id: _id };
            } else {
              return { order: orderDrop + 1, _id: _id };
            }
          default:
            if (column.order < orderDrop) {
              return { order: column.order - 1, _id: _id };
            } else {
              return { order: column.order + 1, _id: _id };
            }
        }
      });
    if (newDataColumnsPATCH) {
      updateColumnsSet({ set: newDataColumnsPATCH, boardId: dataColumnDrag.boardId });
    }
  }
};

export const dndUpdateTasksInsideColumn = (
  dataTaskDrag: ITask,
  dataTaskDrop: ITask,
  dataTasks: ITask[] | undefined,
  updateTasksSet: (data: {
    set: Pick<ITask, '_id' | 'order' | 'columnId'>[];
    boardId: string;
  }) => void
) => {
  const { order: orderDrag } = dataTaskDrag;
  const { order: orderDrop } = dataTaskDrop;
  const newDataTasksPATCH = dataTasks
    ?.filter((item) => {
      if (
        (item.order >= orderDrag && item.order <= orderDrop) ||
        (item.order >= orderDrop && item.order <= orderDrag)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .map((task) => {
      const { order, _id } = task;
      switch (order) {
        case orderDrag:
          return { order: orderDrop, _id: _id, columnId: dataTaskDrop.columnId };
        case orderDrop:
          if (orderDrop > orderDrag) {
            return { order: orderDrop - 1, _id: _id, columnId: dataTaskDrop.columnId };
          } else {
            return { order: orderDrop + 1, _id: _id, columnId: dataTaskDrop.columnId };
          }
        default:
          if (task.order < orderDrop) {
            return { order: task.order - 1, _id: _id, columnId: dataTaskDrop.columnId };
          } else {
            return { order: task.order + 1, _id: _id, columnId: dataTaskDrop.columnId };
          }
      }
    });
  if (newDataTasksPATCH) {
    updateTasksSet({ set: newDataTasksPATCH, boardId: dataTaskDrag.boardId });
  }
};

export const dndUpdateTasksBetweenColumn = (
  dataTaskDrag: ITask,
  dataTaskDrop: ITask,
  dataTasks: ITask[],
  dataTasksDrop: ITask[],
  updateTasksSet: (data: {
    set: Pick<ITask, '_id' | 'order' | 'columnId'>[];
    boardId: string;
  }) => void
) => {
  const dataTasksAfterDrag = getTasksAfterDelTask(dataTasks, dataTaskDrag);

  const dataTasksAfterDrop = dataTasksDrop.map((task) => {
    if (task.order < dataTaskDrop.order) {
      return { _id: task._id, order: task.order, columnId: task.columnId };
    } else {
      return { _id: task._id, order: task.order + 1, columnId: task.columnId };
    }
  });

  const setTasks = dataTasksAfterDrag.concat([
    ...dataTasksAfterDrop,
    {
      _id: dataTaskDrag._id,
      order: dataTaskDrop.order,
      columnId: dataTaskDrop.columnId,
    },
  ]);
  updateTasksSet({ set: setTasks, boardId: dataTaskDrag.boardId });
};

export const dndAddTaskToEmptyColumn = (
  dataTaskDrag: ITask,
  dataTasks: ITask[],
  columnId: string,
  updateTasksSet: (data: {
    set: Pick<ITask, '_id' | 'order' | 'columnId'>[];
    boardId: string;
  }) => void
) => {
  const dataTasksAfterDrag = getTasksAfterDelTask(dataTasks, dataTaskDrag);
  const setTasks = dataTasksAfterDrag.concat([
    { _id: dataTaskDrag._id, order: 1, columnId: columnId },
  ]);
  updateTasksSet({ set: setTasks, boardId: dataTaskDrag.boardId });
};
