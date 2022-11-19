import { Alert, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import BoardCard from './BoardCard/BoardCard';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetBoardsSetByUserIdQuery } from 'services/boards.api';
import { useAppSelector } from 'store/redux.hooks';
import { selectUser } from 'store/userSlice';

const BoardsList = () => {
  const { loggedIn, id } = useAppSelector(selectUser);
  const { data, isError, isLoading } = useGetBoardsSetByUserIdQuery(id);

  if (!loggedIn) {
    //TODO Redirect
    return <p>redirect to welcome page</p>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: '1rem' }}>
        My boards
      </Typography>
      <Box textAlign={'center'}>
        {isLoading && <CircularProgress size={80} />}
        {isError && (
          <Alert variant="outlined" severity="error">
            Oops! A Server error occurred.
          </Alert>
        )}
      </Box>
      <Grid container spacing={2}>
        {data &&
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
