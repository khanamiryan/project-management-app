import { Box, Button, Dialog, Typography } from '@mui/material';
import InputText from 'components/InputText/InputText';
//import Modal from 'components/Modal/Modal';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAddColumnMutation } from 'services/board.api';
import './ModalCreate.scss';

interface ICreateModalProps {
  boardId: string;
  countColumns: number;
  openModal: boolean;
  closeModal: () => void;
}

export default function ModalCreate({
  boardId,
  countColumns,
  openModal,
  closeModal,
}: ICreateModalProps): JSX.Element {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      columnName: '',
    },
  });
  const [addColumn] = useAddColumnMutation();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    addColumn({ title: data.columnName, order: countColumns + 1, boardId: boardId });
    setValue('columnName', '');
    closeModal();
  };

  const handleCancel = () => {
    setValue('columnName', '');
    closeModal();
  };

  //todo : add check input, add errors
  //todo : add logic for order column
  return (
    <Dialog open={openModal} onClose={closeModal} className="modal-form">
      <Box component="form" className="column-create-form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h3">
          Add List
        </Typography>
        <InputText
          name="columnName"
          label="List name"
          autoComplete="list name"
          control={control}
          rules={{
            required: 'title is required',
            minLength: {
              value: 3,
              message: 'Column name is too short',
            },
            maxLength: {
              value: 20,
              message: 'No more then 20 letters',
            },
          }}
        />
        <Button type="submit">Submit</Button>
        <Button onClick={handleCancel}>Close</Button>
      </Box>
    </Dialog>
  );
}
