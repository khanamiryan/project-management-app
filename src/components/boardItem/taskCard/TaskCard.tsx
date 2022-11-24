import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import Modal from 'components/Modal/Modal';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDeleteTaskMutation, useUpdateTasksSetMutation } from 'services/board.api';
import { dndUpdateTasks } from 'services/dndSortColumns';
import { ITask } from 'types/types';
import './taskCard.scss';

interface IDropResultTask {
  dataTask: ITask;
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

  const [{ isDragging }, dragRefTask] = useDrag(
    () => ({
      type: 'task',
      item: dataTask,
      end: (dataTaskDrag, monitor) => {
        //todo: add to empty column

        const dataTaskDrop = monitor.getDropResult<IDropResultTask>()?.dataTask;
        if (dataTaskDrag && dataTaskDrop && dataTaskDrag._id !== dataTaskDrop._id) {
          if (dataTaskDrag.columnId === dataTaskDrop?.columnId) {
            dndUpdateTasks(dataTaskDrag, dataTaskDrop, dataTasks, wrapperUpdateTasksSet);
          } else {
            console.log(' task DND', dataTaskDrag, dataTaskDrop);
            if (dataTaskDrag && dataTaskDrop && dataTaskDrag._id !== dataTaskDrop._id) {
              if (dataTaskDrag.columnId === dataTaskDrop.columnId) {
                console.log('один столбец');
              } else {
                console.log('разные столбцы');
              }
            }
          }
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [dataTasks]
  );
  const [{ isOver }, dropRefTask] = useDrop(
    () => ({
      accept: 'task',
      drop: () => ({ dataTask }),
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
