import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Badge,
  IconButton,
} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Board } from 'types/types';
import { isBoardOwner } from 'utils/isBoardOwner';
import Modal from 'components/Modal/Modal';
import { decodedToken } from 'services/api';
import LoadingBackdrop from 'components/LoadingBackdrop/LoadingBackdrop';
import { useDeleteBoardMutation, useUpdateBoardMutation } from 'services/boards.api';

const BoardCard = ({ board }: { board: Board }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isOwner = isBoardOwner(board.owner);
  const modalTitle = `${isOwner ? 'Delete' : 'Leave'} the board ${board.title}?`;
  const modalText = `It's irreversible. If you ${
    isOwner ? 'delete' : 'leave'
  } this board, you won't be able to restore it.`;
  const [deleteBoard, result] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const onClickDelete = () => {
    setModalOpen(true);
  };
  const onModalClose = () => setModalOpen(false);
  const onBoardDelete = () => {
    //TODO dispatch action for delete or leave board
    if (isOwner) {
      deleteBoard(board._id);
    } else {
      const users = board.users.filter((id) => id !== decodedToken.id);
      updateBoard({ ...board, users });
    }
    onModalClose();
  };

  if (result.isLoading) {
    return <LoadingBackdrop />;
  }

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {board.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Role: {isOwner ? 'owner' : 'contributor'}
          </Typography>
          <Typography variant="body2">
            <Badge badgeContent={board.users.length + 1} color="primary">
              <AssignmentIndIcon color="action" fontSize="large" />
            </Badge>
          </Typography>
        </CardContent>
        <CardActions sx={{ pt: 0 }}>
          <Button variant="contained" href={`/boards/${board._id}`}>
            OPEN BOARD
          </Button>
        </CardActions>
        <IconButton
          sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
          onClick={onClickDelete}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Card>
      <Modal
        open={modalOpen}
        title={modalTitle}
        onClickConfirm={onBoardDelete}
        onClickCancel={onModalClose}
      >
        {modalText}
      </Modal>
    </>
  );
};

export default BoardCard;
