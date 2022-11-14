import { Button, ButtonGroup } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import './boardItem.scss';
import TasksList from './tasksList/TasksList';

export default function BoardItem(): JSX.Element {
  const handleEditBoard = () => {};
  const handleDeleteBoard = () => {};

  return (
    <>
      <Box className="board-header">
        <Stack
          className="board-nav"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <h1 className="board-title">Beta Board Item</h1>
          <Button variant="contained" color="warning">
            Description
          </Button>
          <Box>
            <ButtonGroup>
              <Button variant="contained" color="warning" onClick={handleEditBoard}>
                Edit
              </Button>
              <Button variant="contained" color="warning" onClick={handleDeleteBoard}>
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </Box>
      <Stack className="board-body" direction="row" spacing={{ xs: 1, sm: 2, md: 3 }}>
        <TasksList></TasksList>
        <TasksList></TasksList>
        <TasksList></TasksList>
        <TasksList></TasksList>
        <TasksList></TasksList>

        <Box className="board-add-list board-column">
          <Button className="button-add-list" variant="contained" fullWidth>
            Add List
          </Button>
        </Box>
      </Stack>
    </>
  );
}
