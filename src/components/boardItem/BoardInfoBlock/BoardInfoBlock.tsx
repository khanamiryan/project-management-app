import { Stack, ButtonGroup, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import { Board, BoardFormFields } from 'types/types';
import { useTranslation } from 'react-i18next';
import { useDeleteBoardMutation, useUpdateBoardMutation } from 'services/boards.api';
import { useAppSelector, useAppDispatch } from 'store/redux.hooks';
import { selectUser } from 'store/userSlice';
import { showToast } from 'store/toastSlice';
import Modal from 'components/Modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from 'components/InputText/InputText';
import UsersSelect from 'components/UsersSelect/UsersSelect';

const BoardInfoBlock = ({ board }: { board: Board }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'delete' | 'edit'>('delete');
  const { id: currentUserId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isOwner = currentUserId === board.owner;
  const modalDeleteTitle =
    t(isOwner ? 'modal.board.onDeleteTitle' : 'modal.board.onLeaveTitle') + ` ${board.title}?`;
  const modalDeleteText = t(isOwner ? 'modal.board.onDeleteText' : 'modal.board.onLeaveText');
  const { handleSubmit, control } = useForm<BoardFormFields>({
    defaultValues: {
      title: board.title,
    },
  });
  let users: string[] = board.users;
  const onShare = (usersId: string[]) => {
    users = usersId;
  };
  const modalEditContent = (
    <>
      <InputText
        name="title"
        label={t('modal.board.onCreateTitle')}
        autoComplete="title"
        control={control}
        rules={{
          required: t('modal.board.errorTitleMessage') as string,
        }}
        inputProps={{
          style: { fontSize: '1.2rem' },
        }}
      />
      <UsersSelect onUserSelect={onShare} selectedUsersId={board.users} />
    </>
  );

  const [deleteBoard, deleteResult] = useDeleteBoardMutation();
  const [updateBoard, updateResult] = useUpdateBoardMutation();
  const isLoading = deleteResult.isLoading || updateResult.isLoading;
  const isSuccess = deleteResult.isSuccess;

  const onClickDelete = () => {
    setModalType('delete');
    setModalOpen(true);
  };
  const onClickEdit = () => {
    setModalType('edit');
    setModalOpen(true);
  };

  const onModalClose = () => setModalOpen(false);
  const onBoardDelete = () => {
    if (isOwner) {
      deleteBoard(board._id);
    } else {
      const users = board.users.filter((id) => id !== currentUserId);
      updateBoard({ ...board, users });
    }
    onModalClose();
  };
  const onBoardEdit: SubmitHandler<BoardFormFields> = (data) => {
    updateBoard({ ...board, users, title: data.title });
    onModalClose();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showToast({
          message: t(isOwner ? 'boards.toast.onSuccesDelete' : 'boards.toast.onSuccesLeave'),
          type: 'success',
        })
      );
    }
  }, [dispatch, isOwner, isSuccess]);

  return (
    <>
      <Stack
        className="board-nav"
        direction={{ xs: 'row', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography variant={'h3'} component="h1" className="board-title">
          {board.title}
        </Typography>
        <ButtonGroup>
          <IconButton onClick={onClickEdit}>
            <EditIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={onClickDelete}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </ButtonGroup>
      </Stack>
      <Modal
        open={modalOpen}
        title={modalType === 'delete' ? modalDeleteTitle : 'Edit board'}
        onClickConfirm={modalType === 'delete' ? onBoardDelete : handleSubmit(onBoardEdit)}
        onClickCancel={onModalClose}
      >
        {modalType === 'delete' ? modalDeleteText : modalEditContent}
      </Modal>
    </>
  );
};

export default BoardInfoBlock;
