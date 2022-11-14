import { Container } from '@mui/material';
import BoardsList from 'components/boardsList/BoardsList';
import React from 'react';
import './boards.scss';
import { useAppSelector } from '../../store/redux.hooks';
import { selectUser } from '../../store/userSlice';

export default function Boards(): JSX.Element {
  const user = useAppSelector(selectUser);
  return (
    <Container maxWidth="lg">
      <h2>{`Welcome to your Boards ${user.name}`}</h2>
      <BoardsList />
    </Container>
  );
}
