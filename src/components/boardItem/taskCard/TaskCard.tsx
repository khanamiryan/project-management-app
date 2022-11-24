import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import Modal from 'components/Modal/Modal';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDeleteTaskMutation, useUpdateTasksSetMutation } from 'services/board.api';
import { dndUpdateTasksBetweenColumn, dndUpdateTasksInsideColumn } from 'services/dndSortColumns';
import { ITask } from 'types/types';
import './taskCard.scss';

interface IDropResultTask {
  dataTask: ITask;
  dataTasks: ITask[];
}
type taskCardProps = {
  dataTask: ITask;
  dataTasks: ITask[];
  editTask: (taskData: ITask) => void;
  onDelete: (task: ITask) => void;
};
export default function TaskCard({
  dataTask,
  dataTasks,
  editTask,
  onDelete,
}: taskCardProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  //const [openEditModal, setOpenEditModal] = useState(false);

  const { title, description, _id, boardId, columnId, order } = dataTask;
  // const [deleteTask] = useDeleteTaskMutation();
  const [updateTasksSet] = useUpdateTasksSetMutation();
  const wrapperUpdateTasksSet = (data: Pick<ITask, '_id' | 'order' | 'columnId'>[]) => {
    updateTasksSet(data);
  };
  const refTask = useRef(null);
  //todo: styles for isDragging component
  const [{ isDragging }, dragRefTask] = useDrag(
    () => ({
      type: 'task',
      item: dataTask,
      end: (dataTaskDrag, monitor) => {
        //todo: add logic to empty column

        const dataTaskDrop = monitor.getDropResult<IDropResultTask>()?.dataTask;
        const dataTasksDrop = monitor.getDropResult<IDropResultTask>()?.dataTasks;
        if (
          dataTaskDrag &&
          dataTaskDrop &&
          dataTasksDrop &&
          dataTaskDrag._id !== dataTaskDrop._id
        ) {
          if (dataTaskDrag.columnId === dataTaskDrop?.columnId) {
            dndUpdateTasksInsideColumn(
              dataTaskDrag,
              dataTaskDrop,
              dataTasks,
              wrapperUpdateTasksSet
            );
          } else {
            dndUpdateTasksBetweenColumn(
              dataTask,
              dataTaskDrop,
              dataTasks,
              dataTasksDrop,
              wrapperUpdateTasksSet
            );
          }
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [dataTasks]
  );

  // todo: styles for isOver Component
  const [{ isOver }, dropRefTask] = useDrop(
    () => ({
      accept: 'task',
      drop: () => ({ dataTask, dataTasks }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [dataTasks]
  );

  dragRefTask(dropRefTask(refTask));

  const handleEditTask = () => {
    editTask(dataTask);
  };
  const handleDeleteTask = () => {
    setOpenModal(true);
  };

  const confirmDeleteTask = () => {
    //TODO переписать поднять в тасклист вызов deleteTask const [deleteTask] = useDeleteTaskMutation();
    // deleteTask({ _id: _id, boardId: boardId, columnId: columnId });
    onDelete(dataTask);
    setOpenModal(false);
  };
  const cancelDeleteTask = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card ref={refTask} className="task-card" variant="outlined">
        <Typography component="h3"> {title}</Typography>
        <Typography component="p"> {description}</Typography>
        <Typography component="p"> Order:{order}</Typography>
        <ButtonGroup>
          <Button onClick={handleEditTask}> Edit</Button>
          <Button onClick={handleDeleteTask}> Del</Button>
        </ButtonGroup>
      </Card>
      <Modal
        open={openModal}
        title={`do you really want to remove "${title}" task?`}
        onClickConfirm={confirmDeleteTask}
        onClickCancel={cancelDeleteTask}
      >
        if you delete this list you will not be able to restore it
      </Modal>
    </>
  );
}
