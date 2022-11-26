import React, { useEffect } from 'react';
import './SignIn.scss';
import { Avatar, Box, Button, Link, Typography, Card, CardContent } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { useAppDispatch } from '../../store/redux.hooks';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { showToast } from 'store/toastSlice';

import { useTranslation } from 'react-i18next';
import { rules } from '../../utils/validation.utils';
import { useSignInUserMutation } from '../../services/auth.api';
import { useUser } from '../../hooks/useUser';
import { ISignInForm } from '../../types/types';

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
  const { loggedIn } = useUser();

  useEffect(() => {
    if (loggedIn) {
      dispatch(showToast({ message: 'Success', type: 'success' }));
      // navigate('/boards');
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
    <Card component="form" onSubmit={handleSubmit(onSubmit)} className="SignInForm">
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signInTitle')}
        </Typography>
        <InputText
          name="login"
          label={t('form.fields.login')}
          autoComplete="login"
          control={control}
          rules={rules.login}
          fullWidth
        />

        <InputText
          name="password"
          control={control}
          rules={rules.password}
          margin="normal"
          label={t('form.fields.password')}
          type="password"
          fullWidth
          autoComplete="password"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
          sx={{ mb: 2, mt: 1 }}
        >
          {t('form.fields.signIn')}
          {isLoading && '...'}
        </Button>

        <Link href="/registration" margin="normal">
          {t('form.noAccount')}
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignIn;
