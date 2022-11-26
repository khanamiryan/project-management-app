import { Alert, Button, CircularProgress } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import './boardItem.scss';
import TasksList from './tasksList/TasksList';
import {
  useDeleteColumnMutation,
  useGetColumnsQuery,
  useGetTasksByBoardIdQuery,
  useUpdateColumnsSetMutation,
} from './../../services/board.api';
import { useNavigate, useParams } from 'react-router-dom';
import ModalCreate from './ModalCreate/ModalCreate';
import { useAppSelector } from 'store/redux.hooks';
import { selectUser } from 'store/userSlice';
import { useGetBoardByIdQuery } from 'services/boards.api';
import { IColumn } from 'types/types';
import { t } from 'i18next';
import BoardInfoBlock from './BoardInfoBlock/BoardInfoBlock';

export default function BoardItem(): JSX.Element {
  // todo: loader, toast
  const navigate = useNavigate();
  const idBoard = useParams().id as string;
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const { id: userId } = useAppSelector(selectUser);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumsSet] = useUpdateColumnsSetMutation();

  const {
    data: dataCurrentBoard,
    isLoading: isBoardLoading,
    isError: isBoardError,
  } = useGetBoardByIdQuery(idBoard);
  const {
    data: dataColumns,
    isLoading: isColumnsLoading,
    isError: isColumnsError,
  } = useGetColumnsQuery(idBoard);
  const {
    data: dataTasksByBoardId,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useGetTasksByBoardIdQuery(idBoard);

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

  useEffect(() => {
    const isMember = () => {
      return (
        dataCurrentBoard?.owner === userId || dataCurrentBoard?.users.some((id) => id === userId)
      );
    };

    if (dataCurrentBoard === null || (dataCurrentBoard && !isMember())) {
      navigate('/boards/');
    }
  });

  return (
    <Box className={'board'}>
      <Box className="board-header">
        {isBoardLoading && <CircularProgress size={80} />}
        {isBoardError && (
          <Alert variant="outlined" severity="error">
            {t('boards.serverError')}
          </Alert>
        )}
        {dataCurrentBoard && <BoardInfoBlock board={dataCurrentBoard} />}
      </Box>

      <Stack
        className="board-body"
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          margin: 0,
          display: 'flex',
          maxHeight: '100%',
        }}
      >
        {dataColumns &&
          [...dataColumns]
            .sort((a, b) => {
              if (a.order > b.order) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((dataColumn) => {
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
    </Box>
  );
}
