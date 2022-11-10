import React from 'react';
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
import { Board } from '../boardsList.types';
import { isBoardOwner } from 'utils/isBoardOwner';

const BoardCard = ({ board }: { board: Board }) => {
  const onClickDelete = () => {
    // TODO We need modal window for this
    // eslint-disable-next-line no-restricted-globals
    confirm(`Are you absolutely sure you want to delete this board?
    ${JSON.stringify(board)}`);
  };

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {board.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Role: {isBoardOwner(board.owner) ? 'owner' : 'contributor'}
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
    </>
  );
};

export default BoardCard;
