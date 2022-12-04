import { Box, CircularProgress, List } from '@mui/material';
import ErrorAlert from 'components/ErrorAlert/ErrorAlert';
import Searchbar from 'components/Searchbar/Searchbar';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React, { useEffect, useState } from 'react';
import { useGetTasksSetBySearchQuery } from 'services/board.api';
import TaskListItem from './TaskListItem/TaskListItem';

const TaskSearchBlock = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { id: currentUserId } = useCurrentUser();
  const {
    data: tasks,
    refetch,
    isLoading,
    isError,
    isFetching,
  } = useGetTasksSetBySearchQuery({
    userId: currentUserId,
    searchString: searchValue,
  });

  const onSearchInputChange = (value: string) => {
    setInputValue(value);
  };
  const searchTasks = () => {
    setSearchValue(inputValue);
    refetch();
  };

  // TODO need refactor
  const getFilteredTask = () => {
    if (!tasks || !tasks.length) {
      return [];
    }
    return tasks.filter((task) => {
      if (task.userId === currentUserId) {
        return true;
      }
      if (task.users.includes(currentUserId)) {
        return true;
      }
      return false;
    });
  };

  const userTasks = getFilteredTask();

  return (
    <Box>
      <Searchbar value={inputValue} onChange={onSearchInputChange} onSubmit={searchTasks} />
      {isFetching && <CircularProgress size={80} />}
      {isError && <ErrorAlert />}
      {!isFetching && !isError && (
        <List>
          {Boolean(userTasks.length) &&
            userTasks.map((task) => <TaskListItem key={task._id} task={task} />)}
        </List>
      )}
    </Box>
  );
};

export default TaskSearchBlock;
