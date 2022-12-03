import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { useGetUsersQuery } from 'services/users.api';
import { ITask } from 'types/types';

const TaskListItem = ({ task }: { task: ITask }) => {
  const { data: allUsers, isError, isLoading } = useGetUsersQuery('');
  const { boardId, description, title, userId, users } = task;

  const getLoginById = (id: string) => {
    console.log(id);
    return allUsers?.find((user) => user.id === id)?.login || 'account deleted';
  };

  // if (isError || isLoading) {
  //   return null;
  // }
  console.log(allUsers);

  return (
    <ListItem>
      <ListItemText>{title}</ListItemText>
      <ListItemText>Description: {description}</ListItemText>
      <ListItemText>{`Creator: ${getLoginById(userId)}`}</ListItemText>
      <ListItemText>Users:</ListItemText>
      {users.length &&
        users.map((userId) => <ListItemText key={userId}>{getLoginById(userId)}</ListItemText>)}
      <ListItemButton>{'go to board'}</ListItemButton>
    </ListItem>
  );
};

export default TaskListItem;
