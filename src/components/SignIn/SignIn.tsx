import React, { useEffect, useState } from 'react';
import './SignIn.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { ISignInForm, selectUser } from '../../store/userSlice';

import { useNavigate } from 'react-router-dom';
import { showToast } from 'store/toastSlice';

import { useTranslation } from 'react-i18next';
import { rules } from '../../utils/validation.utils';
import { useSignInUserMutation } from '../../services/users.api';
import { useUser } from '../../store/useUser';

const SignIn = () => {
  const [signInUser, { isLoading }] = useSignInUserMutation();

  const { handleSubmit, control, setError } = useForm<ISignInForm>({
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useUser();

  useEffect(() => {
    if (loggedIn) {
      dispatch(showToast({ message: 'Success', type: 'success' }));
      navigate('/boards');
    }
  }, [loggedIn]);

  const onSubmit: SubmitHandler<ISignInForm> = ({ login, password }) => {
    signInUser({ login, password })
      .unwrap()
      .catch((e) => {
        dispatch(showToast({ message: e.data.message }));
        setError('login', { type: 'custom', message: '' });
        setError('password', { type: 'custom', message: '' });
      });
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

      <Button type="submit" variant="contained" disabled={isLoading}>
        {t('form.fields.signIn')}
        {isLoading && '...'}
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
