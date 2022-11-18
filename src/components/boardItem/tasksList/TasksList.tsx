import { Box, Button, ButtonGroup, Card, Input } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { IColumn, ITask } from 'types/types';
import TaskCard from '../taskCard/TaskCard';
import './tasksList.scss';
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  //useAddTaskMutation,
  //useGetTasksByColumnQuery,
} from './../../../services/board.api';
import Modal from 'components/Modal/Modal';
import ModalCreate from '../ModalCreate/ModalCreate';

interface ITaskListProps {
  dataColumn: IColumn;
  dataTasks: ITask[] | undefined;
}

export default function TasksList({ dataColumn, dataTasks }: ITaskListProps): JSX.Element {
  const { _id: columnId, title, boardId } = dataColumn;

  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(dataColumn.title);

  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

  const confirmDeleteColumn = () => {
    deleteColumn({ _id: columnId, boardId: boardId });
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
    const newColumnData = { _id: columnId, title: newColumnTitle, order: 4 }; // todo: order
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
          {dataTasks &&
            dataTasks.map((task) => {
              return <TaskCard key={task._id} dataTask={task}></TaskCard>;
            })}
        </Stack>
        <Button variant="contained" fullWidth onClick={() => setOpenModalCreate(true)}>
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
      {dataTasks && (
        <ModalCreate
          type="Task"
          boardId={boardId || ''}
          currentLength={dataTasks.length}
          openModal={openModalCreate}
          closeModal={() => setOpenModalCreate(false)}
          columnId={columnId}
        ></ModalCreate>
      )}
    </>
  );
}
