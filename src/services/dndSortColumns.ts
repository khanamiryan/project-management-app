import { DragSourceMonitor } from 'react-dnd';
import { IColumn, ITask } from '../types/types';
import { useUpdateTasksSetMutation } from './board.api';

const dndSortColumns = (dataColumnDrag: IColumn, dataColumnDrop: IColumn) => {};
export default dndSortColumns;

export const dndUpdateColumns = (
  dataColumnDrag: IColumn,
  monitor: DragSourceMonitor<IColumn, unknown>,
  dataColumns: IColumn[] | undefined,
  updateColumnsSet: (data: Pick<IColumn, '_id' | 'order'>[]) => void
) => {
  const typeData = typeof dataColumnDrag;
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
              console.log(orderDrop);
              return { order: column.order - 1, _id: _id };
            } else {
              console.log(orderDrop);
              return { order: column.order + 1, _id: _id };
            }
        }
      });
    if (newDataColumnsPATCH) {
      updateColumnsSet(newDataColumnsPATCH);
    }
  }
};

export const dndUpdateTasks = (
  dataTaskDrag: ITask,
  dataTaskDrop: ITask,
  dataTasks: ITask[] | undefined,
  updateTasksSet: (data: Pick<ITask, '_id' | 'order' | 'columnId'>[]) => void
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
            console.log(orderDrop);
            return { order: task.order - 1, _id: _id, columnId: dataTaskDrop.columnId };
          } else {
            console.log(orderDrop);
            return { order: task.order + 1, _id: _id, columnId: dataTaskDrop.columnId };
          }
      }
    });
  if (newDataTasksPATCH) {
    updateTasksSet(newDataTasksPATCH);
  }
};
