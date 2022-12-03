import { Box, List } from '@mui/material';
import Searchbar from 'components/Searchbar/Searchbar';
import React, { useState } from 'react';
import { useGetTasksSetBySearchQuery } from 'services/board.api';
import TaskListItem from './TaskListItem/TaskListItem';

const TaskSearchBlock = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { data: tasks } = useGetTasksSetBySearchQuery(searchValue);
  const onSearchInputChange = (value: string) => {
    setInputValue(value);
  };
  const searchTasks = () => {
    setSearchValue(inputValue);
  };

  const userTasks = tasks || [];

  // console.log(tasks);

  return (
    <Box>
      <Searchbar value={inputValue} onChange={onSearchInputChange} onSubmit={searchTasks} />
      <List>
        {userTasks.length && userTasks.map((task) => <TaskListItem key={task._id} task={task} />)}
      </List>
    </Box>
  );
};

export default TaskSearchBlock;
