import { Container } from '@mui/material';
import BoardsList from 'components/boardsList/BoardsList';
import React from 'react';
import './boards.scss';

export default function Boards(): JSX.Element {
  return (
    <Container maxWidth="lg">
      <h2>Boards route</h2>
      <BoardsList />
    </Container>
  );
}
