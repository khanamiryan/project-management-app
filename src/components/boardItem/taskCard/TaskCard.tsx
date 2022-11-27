import { Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import InputText from 'components/InputText/InputText';
import Modal from 'components/Modal/Modal';
import UserChip from 'components/UserChip/UserChip';
import UsersSelect from 'components/UsersSelect/UsersSelect';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateTaskMutation } from 'services/board.api';
import { useGetBoardByIdQuery } from 'services/boards.api';
import { useGetUsersQuery } from 'services/users.api';
import { ITask, TaskFormFields, User } from 'types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrag, useDrop } from 'react-dnd';
import { useUpdateTasksSetMutation } from 'services/board.api';
import {
  dndAddTaskToEmptyColumn,
  dndUpdateTasksBetweenColumn,
  dndUpdateTasksInsideColumn,
} from 'services/dndSortColumns';
import RoundUsersAvatars from 'components/RoundUsersAvatars/RoundUsersAvatars';

type ModalType = 'delete' | 'edit' | 'view';

interface IDropResultTask {
  dataTask: ITask;
  dataTasks: ITask[];
  isOverCurrent: boolean;
  columnIdDrop: string;
}
type taskCardProps = {
  dataTask: ITask;
  dataTasks: ITask[];
  onDelete: (task: ITask) => void;
};
export default function TaskCard({ dataTask, dataTasks, onDelete }: taskCardProps): JSX.Element {
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
  const [updateTasksSet] = useUpdateTasksSetMutation();
  const wrapperUpdateTasksSet = (data: Pick<ITask, '_id' | 'order' | 'columnId'>[]) => {
    updateTasksSet(data);
  };
  const refTask = useRef(null);
  //todo: styles for isDragging component
  const [{ isDragging }, dragRefTask] = useDrag(
    () => ({
      type: 'task',
      item: dataTask,
      end: (dataTaskDrag, monitor) => {
        const dataTaskDrop = monitor.getDropResult<IDropResultTask>()?.dataTask;
        const dataTasksDrop = monitor.getDropResult<IDropResultTask>()?.dataTasks;
        const columnIdDrop = monitor.getDropResult<IDropResultTask>()?.columnIdDrop;

        if (
          dataTaskDrag &&
          dataTaskDrop &&
          dataTasksDrop &&
          dataTaskDrag._id !== dataTaskDrop._id
        ) {
          if (dataTaskDrag.columnId === dataTaskDrop.columnId) {
            dndUpdateTasksInsideColumn(
              dataTaskDrag,
              dataTaskDrop,
              dataTasks,
              wrapperUpdateTasksSet
            );
          } else {
            dndUpdateTasksBetweenColumn(
              dataTask,
              dataTaskDrop,
              dataTasks,
              dataTasksDrop,
              wrapperUpdateTasksSet
            );
          }
        } else if (dataTaskDrag && columnIdDrop && !dataTasksDrop) {
          dndAddTaskToEmptyColumn(dataTask, dataTasks, columnIdDrop, wrapperUpdateTasksSet);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [dataTasks]
  );

  // todo: styles for isOver Component
  const [{ isOver, isOverCurrent }, dropRefTask] = useDrop(
    () => ({
      accept: 'task',
      drop: (_item, monitor) => {
        console.log('дроп из карточки', monitor.didDrop());
        if (monitor.didDrop()) {
          return;
        }
        return { dataTask, dataTasks, monitor };
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [dataTasks]
  );

  dragRefTask(dropRefTask(refTask));

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
    //TODO переписать поднять в тасклист вызов deleteTask const [deleteTask] = useDeleteTaskMutation();
    onDelete(dataTask);
    closeModal();
  };

  return (
    <>
      <Card
        ref={refTask}
        variant="outlined"
        onClick={handleShowTask}
        sx={{ position: 'relative', overflow: 'visible', padding: '5px' }}
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
