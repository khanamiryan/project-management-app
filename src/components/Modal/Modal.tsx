import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModalProps } from './Modal.types';

export default function Modal({
  open,
  children,
  title,
  confirmButtonText,
  cancelButtonTex,
  onlyConfirmButton,
  onClickConfirm,
  onClickCancel,
}: ModalProps) {
  const content =
    typeof children === 'string' ? (
      <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
    ) : (
      children
    );

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClickCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          {!onlyConfirmButton && (
            <Button onClick={onClickCancel}>{cancelButtonTex || 'Cancel'}</Button>
          )}
          <Button onClick={onClickConfirm} autoFocus>
            {confirmButtonText || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
