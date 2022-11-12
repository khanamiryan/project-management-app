import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ModalProps = {
  open: boolean;
  onClickConfirm: () => void;
  onClickCancel?: () => void;
  children: JSX.Element | string;
  title?: string;
  confirmButtonText?: string;
  cancelButtonTex?: string;
  onlyConfirmButton?: boolean;
};

export default function Modal({
  open,
  onClickConfirm,
  onClickCancel,
  children,
  title,
  confirmButtonText,
  cancelButtonTex,
  onlyConfirmButton,
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
