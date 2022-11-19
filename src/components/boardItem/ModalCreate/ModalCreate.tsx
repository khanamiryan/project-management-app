import { Box, Button, Dialog, Typography } from '@mui/material';
import InputText from 'components/InputText/InputText';
//import Modal from 'components/Modal/Modal';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  useAddColumnMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
} from 'services/board.api';
import { useAppSelector } from 'store/redux.hooks';
import { selectUser } from 'store/userSlice';
import { ITask } from 'types/types';
import './ModalCreate.scss';

interface ICreateModalProps {
  type: 'List' | 'Task';
  action: 'Add' | 'Edit';
  boardId: string;
  currentLength: number;
  openModal: boolean;
  closeModal: () => void;
  taskData?: ITask | null;
  columnId?: string;
}

export default function ModalCreate({
  type,
  action,
  boardId,
  currentLength,
  openModal,
  closeModal,
  taskData,
  columnId,
}: ICreateModalProps): JSX.Element {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  if (taskData) {
    setValue('name', taskData.title);
    setValue('description', taskData.description);
  }

  const { id: userId } = useAppSelector(selectUser);
  const [addColumn] = useAddColumnMutation();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const onSubmit: SubmitHandler<FieldValues> = ({ name, description }) => {
    if (taskData) {
      console.log('taskData');
      updateTask({
        _id: taskData._id,
        title: name,
        order: taskData.order,
        description: description,
        boardId: taskData.boardId,
        columnId: taskData.columnId,
        userId: taskData.userId,
        users: taskData.users,
      });
    } else {
      switch (type) {
        case 'List':
          addColumn({ title: name, order: currentLength + 1, boardId: boardId });
          break;
        case 'Task':
          addTask({
            title: name,
            order: currentLength + 1,
            description: description,
            boardId: boardId,
            columnId: columnId || '',
            userId: userId,
            users: [userId],
          });
      }
    }
    setValue('name', '');
    setValue('description', '');

    closeModal();
  };

  const handleCancel = () => {
    setValue('name', '');
    setValue('description', '');
    closeModal();
  };

  //todo : add check input, add errors
  //todo : add logic for order column

  return (
    <Dialog open={openModal} onClose={closeModal} className="modal-form">
      <Box component="form" className="column-create-form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h3">
          {`${action} ${type}`}
        </Typography>
        <InputText
          name="name"
          label={`${type} name`}
          autoComplete={`${type} name`}
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
        {type === 'Task' && (
          <InputText
            name="description"
            label={`${type} description`}
            autoComplete={`${type} description`}
            control={control}
            rules={{
              required: 'description is required',
              minLength: {
                value: 3,
                message: 'Description is too short',
              },
              maxLength: {
                value: 50,
                message: 'No more then 50 letters',
              },
            }}
          />
        )}
        <Button type="submit">Submit</Button>
        <Button onClick={handleCancel}>Close</Button>
      </Box>
    </Dialog>
  );
}
