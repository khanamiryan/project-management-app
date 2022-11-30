// noinspection AllyPlainJsInspection
//TODO эта модалка создает только колонки,
// функционал создания тасков теперь в другом компоненте, ее можно рефакторить

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
import { rules } from '../../../utils/validation.utils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<FieldValues> = ({ name, description }) => {
    if (taskData) {
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
          {t(action)} {t(type)}
        </Typography>
        <InputText
          name="name"
          label={t('form.fields.columnTitle')}
          autoComplete={t('form.fields.columnTitle') as string}
          control={control}
          rules={rules.columnName}
        />
        {type === 'Task' && (
          <InputText
            name="description"
            label={t('form.fields.typeDescription', { type: t(type) })}
            autoComplete={t('form.fields.typeDescription', { type: t(type) }) as string}
            control={control}
            rules={rules.columnDescription}
          />
        )}
        <Button type="submit">{t('modal.submit')}</Button>
        <Button onClick={handleCancel}>{t('modal.close')}</Button>
      </Box>
    </Dialog>
  );
}
