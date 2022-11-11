import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import React from 'react';
import './taskCard.scss';

interface ITaskCardProps {
  handleDeleteTask: () => void;
}

export default function TaskCard({ handleDeleteTask }: ITaskCardProps): JSX.Element {
  const handleEditTask = () => {};

  return (
    <>
      <Card className="task-card" variant="outlined">
        <Typography component="h3"> Task name</Typography>
        <Typography component="p"> Task description</Typography>
        <ButtonGroup>
          <Button onClick={handleEditTask}> Edit</Button>
          <Button onClick={handleDeleteTask}> Del</Button>
        </ButtonGroup>
      </Card>
    </>
  );
}
