import { Button, ButtonGroup } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import './boardItem.scss';
import TasksList from './tasksList/TasksList';
import {
  useGetBoardsQuery,
  useGetColumnsQuery,
  useAddColumnMutation,
  useDeleteColumnMutation,
} from './../../services/apiBoard/apiBoard';

let title = 'объект 3';
let order = 1;

export default function BoardItem(): JSX.Element {
  const handleEditBoard = () => {};
  const handleDeleteBoard = () => {};

  /*const { data, isError, isLoading } = useGetBoardsQuery('');

  let boardId = '';
  if (data) {
    boardId = data[0]._id;
    console.log('все доски', data[0]._id);
  }*/

  //как получить дату
  const { data: dataColumns } = useGetColumnsQuery('636cd10e96274bebf760a073');
  console.log('данные столбца', dataColumns);

  const [addColumn, {}] = useAddColumnMutation();
  const [deleteColumn, {}] = useDeleteColumnMutation();
  const handleAddColumn = () => {
    addColumn({ title: title, order: order });
    order += 1;
    title += order;
  };
  const handleDelColumn = () => {
    deleteColumn('6373d01c79506c3311ac4db0');
  };
  const handleGetColumns = () => {};

  return (
    <>
      <Box className="board-header">
        <Stack
          className="board-nav"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <h1 className="board-title">Beta Board Item</h1>
          <Button variant="contained" color="warning">
            Description
          </Button>
          <Box>
            <ButtonGroup>
              <Button variant="contained" color="warning" onClick={handleEditBoard}>
                Edit
              </Button>
              <Button variant="contained" color="warning" onClick={handleDeleteBoard}>
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </Box>
      <Stack className="board-body" direction="row" spacing={{ xs: 1, sm: 2, md: 3 }}>
        {dataColumns &&
          dataColumns.map((dataColumn) => (
            <TasksList key={dataColumn._id} dataColumn={dataColumn} />
          ))}

        <Box className="board-add-list board-column">
          <Button
            className="button-add-list"
            variant="contained"
            fullWidth
            onClick={handleAddColumn}
          >
            Add List
          </Button>
        </Box>
      </Stack>
    </>
  );
}
