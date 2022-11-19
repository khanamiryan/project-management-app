import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import Modal from 'components/Modal/Modal';
import React, { useState } from 'react';
import { useDeleteTaskMutation } from 'services/board.api';
import { ITask } from 'types/types';
import './taskCard.scss';

type taskCardProps = {
  dataTask: ITask;
  editTask: (taskData: ITask) => void;
};
export default function TaskCard({ dataTask, editTask }: taskCardProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  //const [openEditModal, setOpenEditModal] = useState(false);

  const { title, description, _id, boardId, columnId, order } = dataTask;
  const [deleteTask] = useDeleteTaskMutation();

  const handleEditTask = () => {
    editTask(dataTask);
  };
  const handleDeleteTask = () => {
    setOpenModal(true);
  };

  const confirmDeleteTask = () => {
    deleteTask({ _id: _id, boardId: boardId, columnId: columnId });
    setOpenModal(false);
  };
  const cancelDeleteTask = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card className="task-card" variant="outlined">
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
