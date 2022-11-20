import React, { useEffect, useState } from 'react';
import './Profile.scss';
import InputText from '../InputText/InputText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { selectUser } from '../../store/userSlice';
import { Alert, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import Modal from '../Modal/Modal';
import { Warning } from '@mui/icons-material';
import { showToast } from 'store/toastSlice';
import { rules } from '../../utils/validation.utils';
import { useTranslation } from 'react-i18next';
import { useDeleteUserMutation, useSetUserInfoMutation } from '../../services/users.api';
import { useUser } from '../../store/useUser';
import { useNavigate } from 'react-router-dom';

export interface IProfile {
  name: string;
  login: string;
  password: string;
}

const Profile = () => {
  const user = useUser();
  const dispatch = useAppDispatch();
  const [setUserInfo, { isLoading, isError, error }] = useSetUserInfoMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<IProfile>({
    defaultValues: {
      name: user.name,
      login: user.login,
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    setUserInfo({ ...data, id: user.id })
      .unwrap()
      .then(() => {
        dispatch(showToast({ type: 'success', message: 'Success!' }));
        navigate('/boards');
      })
      .catch((error) => {
        dispatch(showToast({ message: error.data.message }));
      });
  };

  const handleDeleteUser = () => {
    deleteUser(user.id)
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        dispatch(showToast({ message: error.data.message }));
      });
  };

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="ProfileForm">
      {/*{isError && <Alert severity="error">{error!.data!.message}</Alert>}*/}

      <Modal
        confirmButtonText={isLoading ? 'Deleting...' : 'Confirm'}
        open={open}
        onClickCancel={() => {
          setOpen(false);
        }}
        onClickConfirm={handleDeleteUser}
      >
        <>
          <Warning color="error" />
          {t('sureDeleteUser')}
        </>
      </Modal>

      <div>
        <InputText
          name="name"
          label={t('form.fields.name')}
          autoComplete="off"
          control={control}
          rules={rules.name}
        />
      </div>
      <div>
        <InputText
          name="login"
          label={t('form.fields.login')}
          autoComplete="off"
          control={control}
          rules={rules.login}
        />
      </div>
      <div>
        <InputText
          name="password"
          control={control}
          rules={rules.password}
          margin="normal"
          label={t('form.fields.newPassword')}
          type="password"
          autoComplete="new-password"
        />
      </div>

      <Button variant={'contained'} type="submit" disabled={!isDirty || isLoading}>
        {t('form.fields.save')} {isLoading && '...'}
      </Button>
      <Button onClick={() => setOpen(true)}>{t('form.fields.deleteUser')}</Button>
    </Box>
  );
};

export default Profile;
