import { Button, ButtonGroup } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import './boardItem.scss';
import TasksList from './tasksList/TasksList';
import {
  useDeleteColumnMutation,
  useGetColumnsQuery,
  useGetTasksByBoardIdQuery,
  useUpdateColumnsSetMutation,
} from './../../services/board.api';
import { useParams } from 'react-router-dom';
import ModalCreate from './ModalCreate/ModalCreate';
import { useAppSelector } from 'store/redux.hooks';
import { selectUser } from 'store/userSlice';
import { useGetBoardByIdQuery, useGetBoardsSetByUserIdQuery } from 'services/boards.api';
import { IColumn } from 'types/types';

export default function BoardItem(): JSX.Element {
  // todo: loader, toaster,renavigate
  /*
    const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });
  useEffect(() => {
    if (!dataColumns) {
      goHome();
    }
  }, []);*/
  const { id: idBoard } = useParams();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const { id } = useAppSelector(selectUser);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumsSet] = useUpdateColumnsSetMutation();

  // const { data: dataBoards } = useGetBoardsSetByUserIdQuery(id);
  // const dataCurrentBoard = dataBoards?.find((item) => item._id === idBoard);
  const { data: dataCurrentBoard } = useGetBoardByIdQuery(idBoard as string);
  const { data: dataColumns } = useGetColumnsQuery(idBoard as string);
  const { data: dataTasksByBoardId } = useGetTasksByBoardIdQuery(idBoard || '');

  const handleEditBoard = () => {};
  const handleDeleteBoard = () => {};
  const handleAddColumn = () => {
    setOpenModalCreate(true);
  };

  const onDeleteColumn = (selectedColumn: IColumn) => {
    deleteColumn(selectedColumn);
    if (dataColumns && selectedColumn.order !== dataColumns?.length) {
      const filteredColumns = dataColumns.filter(({ _id }) => _id !== selectedColumn._id);
      const set = filteredColumns.map((column) => {
        if (column.order < selectedColumn.order) {
          return {
            _id: column._id,
            order: column.order,
          };
        } else {
          return {
            _id: column._id,
            order: column.order - 1,
          };
        }
      });
      updateColumsSet(set);
    }
  };

  return (
    <>
      <Box className="board-header">
        <Stack
          className="board-nav"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <h1 className="board-title">
            {dataCurrentBoard?.title || '***** - You do not own this board'}
          </h1>
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
          dataColumns.map((dataColumn) => {
            const tasksByColumn = dataTasksByBoardId?.filter(
              (item) => item.columnId === dataColumn._id
            );
            return (
              <TasksList
                key={dataColumn._id}
                dataColumn={dataColumn}
                dataTasks={tasksByColumn}
                onDeleteColumn={onDeleteColumn}
              />
            );
          })}

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
      {dataColumns && (
        <ModalCreate
          type="List"
          action="Add"
          boardId={idBoard || ''}
          currentLength={dataColumns.length}
          openModal={openModalCreate}
          closeModal={() => setOpenModalCreate(false)}
        ></ModalCreate>
      )}
    </>
  );
}
