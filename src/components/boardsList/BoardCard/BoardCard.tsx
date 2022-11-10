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
          <Button size="medium">OPEN</Button>
        </CardActions>
        <IconButton sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Card>
    </>
  );
};

export default BoardCard;
