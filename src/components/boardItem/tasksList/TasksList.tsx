import { Box, Button, ButtonGroup, Card, Input } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { IColumn } from 'types/types';
import TaskCard from '../taskCard/TaskCard';
import './tasksList.scss';
import { useDeleteColumnMutation } from './../../../services/apiBoard/apiBoard';

interface ITaskListProps {
  dataColumn?: IColumn;
}

export default function TasksList({ dataColumn }: ITaskListProps): JSX.Element {
  const [editTitle, setEditTitle] = useState(false);

  const [deleteColumn, {}] = useDeleteColumnMutation();

  const handleAddTask = () => {};

  if (dataColumn) {
    const { _id, title, order, boardId } = dataColumn;
    const handleDeleteColumn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      deleteColumn(_id);
    };
    return (
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
              <Input></Input>
              <ButtonGroup>
                <Button onClick={() => setEditTitle(!editTitle)}>yes</Button>
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
    );
  } else {
    return (
      <Card className="board-column" variant="outlined">
        <Box className="column-name">
          {!editTitle && (
            <Stack
              className="column-title"
              direction="row"
              spacing={2}
              onClick={() => setEditTitle(!editTitle)}
            >
              <h3>TASKS LIST</h3> <Button>Del</Button>
            </Stack>
          )}
          {editTitle && (
            <Stack className="column-title-edit" direction="row" spacing={2}>
              <Input></Input>
              <ButtonGroup>
                <Button onClick={() => setEditTitle(!editTitle)}>yes</Button>
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
    );
  }
}
