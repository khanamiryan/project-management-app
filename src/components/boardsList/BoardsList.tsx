import { Grid, Typography } from '@mui/material';
import React from 'react';
import BoardCard from './BoardCard/BoardCard';
import { useGetBoardsSetByUserIdQuery } from 'services/api';

const BoardsList = () => {
  const { data } = useGetBoardsSetByUserIdQuery('');

  return (
    <>
      <Typography variant="h4" sx={{ mb: '1rem' }}>
        My boards
      </Typography>
      <Grid container spacing={2}>
        {data?.length &&
          data.map((board) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={board._id}>
                <BoardCard key={board._id} board={board} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default BoardsList;
