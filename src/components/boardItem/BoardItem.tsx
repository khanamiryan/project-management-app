import { Button, ButtonGroup } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import './boardItem.scss';
import TasksList from './tasksList/TasksList';
import { useGetColumnsQuery } from '../../services/board.api';
import { useParams } from 'react-router-dom';
import ModalCreate from './ModalCreate/ModalCreate';

export default function BoardItem(): JSX.Element {
  const { id: idBoard } = useParams();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  //todo renavigate
  /*
    const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });
  useEffect(() => {
    if (!dataColumns) {
      goHome();
    }
  }, []);*/

  const handleEditBoard = () => {};
  const handleDeleteBoard = () => {};
  // todo: loader
  const { data: dataColumns, isLoading, isError } = useGetColumnsQuery(idBoard || '');

  const handleAddColumn = () => {
    setOpenModalCreate(true);
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
      <ModalCreate
        boardId={idBoard || ''}
        countColumns={dataColumns?.length || 0}
        openModal={openModalCreate}
        closeModal={() => setOpenModalCreate(false)}
      ></ModalCreate>
    </>
  );
}
