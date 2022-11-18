import React, { useEffect, useState } from 'react';
import './SignUp.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { ISignUpForm, selectUser, signUp } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { useNavigate } from 'react-router-dom';
import { showToast } from 'store/toastSlice';
import { rules } from '../../utils/validation.utils';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { handleSubmit, control, setError } = useForm<ISignUpForm>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

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
      setError('name', { type: 'custom', message: '' });
      setError('login', { type: 'custom', message: '' });
      setError('password', { type: 'custom', message: '' });
      setMessage(error);
      dispatch(showToast({ message: error }));
    }
  }, [error]);

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    await dispatch(signUp(data));
  };
  const { t } = useTranslation();
  return (
    <Box component="form" className="SignUpForm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputText
          control={control}
          margin="normal"
          label={t('form.fields.name')}
          name="name"
          autoComplete="name"
          autoFocus
          rules={rules.name}
        />
      </div>
      <div>
        <InputText
          control={control}
          margin="normal"
          label={t('form.fields.login')}
          name="login"
          autoComplete="login"
          rules={rules.login}
        />
      </div>
      <div>
        <InputText
          control={control}
          margin="normal"
          name="password"
          label={t('form.fields.password')}
          type="password"
          autoComplete="current-password"
          rules={rules.password}
        />
      </div>
      <Button type="submit" variant="contained" disabled={loading}>
        {t('form.fields.signup')} {loading && '...'}
      </Button>
      <div>
        <Link href="/login" margin="normal">
          {t('form.haveAccount')}
        </Link>
      </div>
    </Box>
  );
};

export default SignUp;
