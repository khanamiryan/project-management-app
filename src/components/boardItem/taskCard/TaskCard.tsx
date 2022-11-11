import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import React from 'react';
import './taskCard.scss';

export default function TaskCard(): JSX.Element {
  return (
    <>
      <Card className="task-card" variant="outlined">
        <Typography component="h3"> Task name</Typography>
        <Typography component="p"> Task description</Typography>
        <ButtonGroup>
          <Button> Edit</Button>
          <Button> Del</Button>
        </ButtonGroup>
      </Card>
    </>
  );
}
