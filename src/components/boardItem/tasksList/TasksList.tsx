import { Box, Button, ButtonGroup, Card, Input } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { IColumn } from 'types/types';
import TaskCard from '../taskCard/TaskCard';
import './tasksList.scss';
import { useDeleteColumnMutation, useUpdateColumnMutation } from '../../../services/board.api';
import Modal from 'components/Modal/Modal';

interface ITaskListProps {
  dataColumn: IColumn;
}

export default function TasksList({ dataColumn }: ITaskListProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(dataColumn?.title || ''); // todo check || ''

  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

  const handleAddTask = () => {};

  const { _id, title } = dataColumn;

  const confirmDeleteColumn = () => {
    deleteColumn(_id);
    setOpenModal(false);
  };
  const cancelDeleteColumn = () => {
    setOpenModal(false);
  };

  const handleDeleteColumn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenModal(true);
  };
  const handleUpdateColumn = () => {
    const newColumnData = { _id: _id, title: newColumnTitle, order: 4 };
    updateColumn(newColumnData);
    setEditTitle(!editTitle);
  };
  return (
    <>
      <Card className="board-column" variant="outlined">
        <Box className="column-name">
          {!editTitle && (
            <Stack
              className="column-title"
              direction="row"
              spacing={2}
              onClick={() => setEditTitle(!editTitle)}
            >
              <h3>{title}</h3> <Button onClick={(e) => handleDeleteColumn(e)}>Del</Button>
            </Stack>
          )}
          {editTitle && (
            <Stack className="column-title-edit" direction="row" spacing={2}>
              <Input
                onChange={(e) => {
                  setNewColumnTitle(e.currentTarget.value);
                  console.log(newColumnTitle);
                }}
                value={newColumnTitle}
              ></Input>
              <ButtonGroup>
                <Button onClick={handleUpdateColumn}>update</Button>
                <Button onClick={() => setEditTitle(!editTitle)}>no</Button>
              </ButtonGroup>
            </Stack>
          )}
        </Box>

        <Stack className="tasks-list" direction={'column'} spacing={1}>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
        </Stack>
        <Button variant="contained" fullWidth onClick={handleAddTask}>
          Add task
        </Button>
      </Card>
      <Modal
        open={openModal}
        title={`do you really want to remove "${title}" list?`}
        onClickConfirm={confirmDeleteColumn}
        onClickCancel={cancelDeleteColumn}
      >
        if you delete this list you will not be able to restore it
      </Modal>
    </>
  );
}
