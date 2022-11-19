import React, { useEffect, useState } from 'react';
import './SignIn.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { ISignInForm, selectUser, signIn } from '../../store/userSlice';

import { useNavigate } from 'react-router-dom';
import { showToast } from 'store/toastSlice';

import { useTranslation } from 'react-i18next';
import { rules } from '../../utils/validation.utils';

const SignIn = () => {
  const { handleSubmit, control, setError } = useForm<ISignInForm>({
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const { t } = useTranslation();
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
      dispatch(showToast({ message: error }));
    }
  }, [error]);

  const onSubmit: SubmitHandler<ISignInForm> = async ({ login, password }) => {
    dispatch(signIn({ login, password }));
  };

  return (
    <Box component="form" className={'SignInForm'} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputText
          name="login"
          label={t('form.fields.login')}
          autoComplete="login"
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
          label={t('form.fields.password')}
          type="password"
          autoComplete="password"
        />
      </div>

      <Button type="submit" variant="contained" disabled={loading}>
        {t('form.fields.signIn')}
        {loading && '...'}
      </Button>
      <div>
        <Link href="/registration" margin="normal">
          {t('form.noAccount')}
        </Link>
      </div>
    </Box>
  );
};

export default SignIn;
