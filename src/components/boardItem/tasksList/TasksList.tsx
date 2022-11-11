import { Button, Card, Input } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import TaskCard from '../taskCard/TaskCard';
import './tasksList.scss';

export default function TasksList(): JSX.Element {
  return (
    <>
      <Card className="board-column" variant="outlined">
        {true && (
          <Stack direction="row" spacing={2}>
            <h3>tasks list</h3> <Button>Del</Button>
          </Stack>
        )}
        {true && (
          <Stack direction="row" spacing={2}>
            <Input></Input>
            <Button>yes</Button>
            <Button>no</Button>
          </Stack>
        )}
        <Stack className="tasks-list" direction={'column'} spacing={1}>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
        </Stack>
        <Button variant="contained" fullWidth>
          Add task
        </Button>
      </Card>
    </>
  );
}
