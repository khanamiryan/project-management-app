import React, { useEffect, useState } from 'react';
import './SignIn.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { ISignInForm, selectUser, signIn } from '../../store/userSlice';

import { useNavigate } from 'react-router-dom';
import Toast from '../Toast/Toast';

import { useTranslation } from 'react-i18next';

const SignIn = () => {
  const { handleSubmit, control, clearErrors, setError } = useForm<ISignInForm>({
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login, loggedIn, error, loading } = useAppSelector(selectUser);

  useEffect(() => {
    if (login.length) {
      navigate('/boards');
    }
  }, [login, loggedIn]);

  useEffect(() => {
    if (error.length) {
      setMessage(error);
      setError('login', { type: 'custom', message: '' });
      setError('password', { type: 'custom', message: '' });
      setOpen(true);
    }
  }, [error]);

  const onSubmit: SubmitHandler<ISignInForm> = async ({ login, password }) => {
    dispatch(signIn({ login, password }));
  };

  return (
    <Box component="form" className={'SignInForm'} onSubmit={handleSubmit(onSubmit)}>
      <Toast
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {message}
      </Toast>

      <div>
        <InputText
          name="login"
          label={t('login')}
          autoComplete="login"
          control={control}
          rules={{
            required: 'Login is required',
            minLength: {
              value: 3,
              message: 'Login is too short',
            },
          }}
        />
      </div>
      <div>
        <InputText
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password is too short',
            },
          }}
          margin="normal"
          label={t('password')}
          type="password"
          autoComplete="password"
        />
      </div>

      <Button type="submit" variant="contained" disabled={loading}>
        {t('signin')}
        {loading && '...'}
      </Button>
      <div>
        <Link href="/registration" margin="normal">
          {t('noAccount')}
        </Link>
      </div>
    </Box>
  );
};

export default SignIn;
