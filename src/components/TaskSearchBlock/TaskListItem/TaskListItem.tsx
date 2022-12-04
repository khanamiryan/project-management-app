import { Box, Button, Divider, ListItem, ListItemText, Typography } from '@mui/material';
import UserChip from 'components/UserChip/UserChip';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from 'services/users.api';
import { ITask } from 'types/types';

const TaskListItem = ({ task }: { task: ITask }) => {
  const { data: allUsers, isError, isLoading } = useGetUsersQuery('');
  const { boardId, description, title, userId, users } = task;
  const navigate = useNavigate();

  const getLoginById = (id: string) => {
    return allUsers?.find((user) => user.id === id)?.login || 'account deleted';
  };

  const goBoard = () => navigate(`/boards/${boardId}`);

  // if (isError || isLoading) {
  //   return null;
  // }

  return (
    <>
      <Divider />
      <ListItem
        sx={{ flexDirection: 'column', alignItems: 'start', flexWrap: 'wrap', gap: '2px', pb: 2 }}
      >
        <ListItemText>
          Title:
          <Typography component={'span'} variant={'h5'}>
            {title}
          </Typography>
        </ListItemText>
        <ListItemText>
          Description:
          <Typography component={'span'} variant={'h6'}>
            {description}
          </Typography>
        </ListItemText>
        <Box display={'flex'}>
          <ListItemText sx={{ pr: '2px' }}>{`Creator:`}</ListItemText>
          <UserChip login={getLoginById(userId)} isOwner />
        </Box>

        <Box display={'flex'} alignItems="center">
          <ListItemText sx={{ pr: '2px' }}>Users:</ListItemText>
          {users.length ? (
            <Box
              display={'flex'}
              sx={{
                flexWrap: 'wrap',
                gap: '2px',
              }}
            >
              {users.map((userId) => (
                <UserChip key={userId} login={getLoginById(userId)} />
              ))}
            </Box>
          ) : (
            'no users'
          )}
        </Box>

        {/* {users.length &&
      users.map((userId) => <ListItemText key={userId}>{getLoginById(userId)}</ListItemText>)} */}
        <Button onClick={goBoard} variant="contained" sx={{ mt: 1 }}>
          {'go to board'}
        </Button>
      </ListItem>
    </>
  );
};

// {ownerObj && (
//   <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, pl: 1 }}>
//     <UserChip login={ownerObj.login} isOwner />
//     {contributors.length &&
//       contributors.map((contributor) => (
//         <UserChip key={contributor.id} login={contributor.login} />
//       ))}
//   </Stack>
// )}

export default TaskListItem;
