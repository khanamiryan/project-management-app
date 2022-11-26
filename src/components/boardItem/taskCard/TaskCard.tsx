import { Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import InputText from 'components/InputText/InputText';
import Modal from 'components/Modal/Modal';
import UserChip from 'components/UserChip/UserChip';
import UsersSelect from 'components/UsersSelect/UsersSelect';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateTaskMutation } from 'services/board.api';
import { useGetBoardByIdQuery } from 'services/boards.api';
import { useGetUsersQuery } from 'services/users.api';
import { ITask, TaskFormFields, User } from 'types/types';
import DeleteIcon from '@mui/icons-material/Delete';

import './taskCard.scss';
import RoundUsersAvatars from 'components/RoundUsersAvatars/RoundUsersAvatars';

type ModalType = 'delete' | 'edit' | 'view';

type taskCardProps = {
  dataTask: ITask;
  onDelete: (task: ITask) => void;
};
export default function TaskCard({ dataTask, onDelete }: taskCardProps): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('view');
  const { data: board } = useGetBoardByIdQuery(dataTask.boardId);
  const { data: allUsers } = useGetUsersQuery('');

  const [updateTask] = useUpdateTaskMutation();

  const { handleSubmit, control } = useForm<TaskFormFields>({
    defaultValues: {
      title: dataTask.title,
      description: dataTask.description,
    },
  });

  const { title, description, _id, boardId, columnId, order } = dataTask;

  const closeModal = () => setOpenModal(false);

  const handleEditTask = () => {
    setModalType('edit');
    setOpenModal(true);
  };

  const handleShowTask = (e: React.MouseEvent) => {
    setModalType('view');
    setOpenModal(true);
  };
  const handleDeleteTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalType('delete');
    setOpenModal(true);
  };

  let users: string[] = dataTask.users;
  const onShare = (usersId: string[]) => {
    users = usersId;
  };

  const onSubmitEditedTask: SubmitHandler<TaskFormFields> = (data) => {
    updateTask({ ...dataTask, ...data, users });
    closeModal();
  };

  const ownerObj = allUsers?.find(({ _id }) => _id === dataTask.userId);
  const contributors = dataTask.users.reduce((acc: User[], userId) => {
    const contributor = allUsers?.find(({ _id }) => userId === _id);
    return contributor ? [...acc, contributor] : acc;
  }, []);

  const getModalProps = () => {
    switch (modalType) {
      case 'delete': {
        return {
          title: `Do you really want to remove task "${title}"?`,
          onClickConfirm: confirmDeleteTask,
        };
      }
      case 'edit': {
        return {
          title: `Edit task "${title}"`,
          onClickConfirm: handleSubmit(onSubmitEditedTask),
        };
      }
      default: {
        return {
          title,
          onClickConfirm: handleEditTask,
          confirmButtonText: 'EDIT',
          cancelButtonText: 'CLOSE',
        };
      }
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'delete': {
        return 'if you delete this task you will not be able to restore it';
      }
      case 'edit': {
        return (
          <>
            <InputText
              name="title"
              label={`Task title`}
              autoComplete={`Task title`}
              control={control}
              rules={{
                required: 'title is required',
                maxLength: {
                  value: 18,
                  message: 'No more then 18 letters',
                },
              }}
            />
            <InputText
              name="description"
              label={`Task description`}
              autoComplete={`Task description`}
              control={control}
              multiline
              maxRows={6}
              rules={{
                required: 'description is required',
              }}
            />
            <UsersSelect
              onUserSelect={onShare}
              selectedUsersId={dataTask.users}
              usersIdForSelection={board && [...board.users, board.owner]}
            />
          </>
        );
      }
      default: {
        return (
          <Stack spacing={2} minWidth={'250px'}>
            {dataTask.description && (
              <>
                <Typography variant="body1">{dataTask.description}</Typography>
                <Divider />
              </>
            )}
            <Box>
              <Typography variant="body1" component={'span'}>
                Creator:{' '}
              </Typography>
              {ownerObj && <UserChip login={ownerObj.login} isOwner />}
            </Box>

            {contributors.length && (
              <>
                <Divider />
                <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography variant="body1" component={'span'}>
                    Users:{' '}
                  </Typography>
                  {contributors.map((contributor) => (
                    <UserChip key={contributor._id} login={contributor.login} />
                  ))}
                </Box>
              </>
            )}
          </Stack>
        );
      }
    }
  };

  const confirmDeleteTask = () => {
    onDelete(dataTask);
    closeModal();
  };

  return (
    <>
      <Card
        className="task-card"
        variant="outlined"
        onClick={handleShowTask}
        sx={{ position: 'relative' }}
      >
        <IconButton
          onClick={(e) => handleDeleteTask(e)}
          sx={{ position: 'absolute', top: '4px', right: '8px' }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Typography component="h3" mt={1} variant={'h6'}>
          {title}
        </Typography>
        <Typography component="p" variant={'body1'}>
          {description.length > 24 ? `${description.slice(0, 24)}...` : description}
        </Typography>
        <RoundUsersAvatars logins={contributors.map(({ login }) => login)} />
        {/* <Typography component="p"> Order:{order}</Typography> */}
      </Card>
      <Modal open={openModal} {...getModalProps()} onClickCancel={closeModal}>
        {getModalContent()}
      </Modal>
    </>
  );
}
