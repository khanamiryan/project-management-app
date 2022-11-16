import { Button, ButtonGroup } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import './boardItem.scss';
import TasksList from './tasksList/TasksList';
import {
  useGetBoardsQuery,
  useGetColumnsQuery,
  useAddColumnMutation,
  useDeleteColumnMutation,
} from '../../services/board.api';
import { useNavigate, useParams } from 'react-router-dom';

let titleMock = 'объект 3';
let orderMock = 1;
const boardIdMock = '6373d01c79506c3311ac4db0';

export default function BoardItem(): JSX.Element {
  const { id: idBoard } = useParams();

  //todo renavigate
  /*
    const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });
  useEffect(() => {
    if (!dataColumns) {
      goHome();
    }
  }, []);*/
  //как получить дату

  const handleEditBoard = () => {};
  const handleDeleteBoard = () => {};

  const { data: dataColumns, isLoading, isError } = useGetColumnsQuery(idBoard || '');

  const [addColumn, {}] = useAddColumnMutation();

  const handleAddColumn = () => {
    addColumn({ title: titleMock, order: orderMock, boardId: idBoard || '' }); // todo: check  || ""
    orderMock += 1;
    titleMock += orderMock;
  };

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
