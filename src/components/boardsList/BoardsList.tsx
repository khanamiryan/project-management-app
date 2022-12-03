import { Alert, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import BoardCard from './BoardCard/BoardCard';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetBoardsSetByUserIdQuery } from 'services/boards.api';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './boardList.scss';
import CreateBoardModal from '../CreateBoardModal/CreateBoardModal';
import TaskSearchBlock from 'components/TaskSearchBlock/TaskSearchBlock';
const BoardsList = () => {
  const { id } = useCurrentUser();
  const { data, isError, isLoading } = useGetBoardsSetByUserIdQuery(id);
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const onClickAddBoard = () => {
    setModalOpen(true);
  };
  const onModalClose = () => setModalOpen(false);

  return (
    <>
      <Typography variant="h4" sx={{ mb: '1rem' }}>
        {t('boards.myBoards')}
      </Typography>
      <Box textAlign={'center'}>
        {isLoading && <CircularProgress size={80} />}
        {isError && (
          <Alert variant="outlined" severity="error">
            {t('boards.serverError')}
          </Alert>
        )}
      </Box>

      <TaskSearchBlock />
      {data && (
        <Grid container spacing={2}>
          {data &&
            data.map((board) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={board._id}>
                  <BoardCard key={board._id} board={board} />
                </Grid>
              );
            })}
          {!isLoading && (
            <Grid item xs={12} sm={6} md={4} key={'add'}>
              <Card onClick={onClickAddBoard} className="addBoardCard">
                <CardContent>
                  <Typography variant="h4" component="div">
                    {t('menu.addBoard')}
                  </Typography>

                  <AddCircleIcon sx={{ width: 50, height: 50 }} />
                </CardContent>
              </Card>
            </Grid>
          )}
          {modalOpen && <CreateBoardModal onModalClose={onModalClose} open={modalOpen} />}
        </Grid>
      )}
    </>
  );
};

export default BoardsList;
