import React, { useEffect, useState } from 'react';
import './Profile.scss';
import InputText from '../InputText/InputText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { deleteUser, getUser, selectUser, setUserInfo } from '../../store/userSlice';
import { Alert, AlertColor, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import Modal from '../Modal/Modal';
import { Warning } from '@mui/icons-material';
import Toast from '../Toast/Toast';
import { rules } from '../../utils/validation.utils';
import { useTranslation } from 'react-i18next';

interface IProfile {
  name: string;
  login: string;
  password: string;
}

const Profile = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

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
  useEffect(() => {
    //todo add getCurrentUser function, without giving id
    //  todo add function, that will dynamically change values, if it was changed in another place
    if (user.id) {
      //in the future if will not used, because it will page with private id
      dispatch(getUser(user.id));
    }
  }, []);

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    dispatch(setUserInfo(data))
      .unwrap()
      .then(() => {
        setToastMessage('Success!!!');
        setToastType('success');
      });
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id)).then(() => {
      setOpen(false);
    });
  };

  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<AlertColor>('error');

  useEffect(() => {
    if (user.error.length > 0) {
      setToastMessage(user.error);
      setToastType('error');
    }
  }, [user.error]);
  useEffect(() => {
    setToastOpen(toastMessage.length > 0);
  }, [toastMessage]);

  const { t } = useTranslation();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="ProfileForm">
      {user.error && <Alert severity="error">{user.error}</Alert>}
      <Toast
        open={toastOpen}
        onClose={() => {
          setToastOpen(false);
        }}
        type={toastType}
      >
        {toastMessage}
      </Toast>

      <Modal
        confirmButtonText={user.loading ? 'Deleting...' : 'Confirm'}
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

      <Button variant={'contained'} type="submit" disabled={!isDirty || user.loading}>
        {t('form.fields.save')} {user.loading && '...'}
      </Button>
      <Button onClick={() => setOpen(true)}>{t('form.fields.deleteUser')}</Button>
    </Box>
  );
};

export default Profile;
