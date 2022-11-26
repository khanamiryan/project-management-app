import React from 'react';
import './SignUp.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';

import { useAppDispatch } from '../../store/redux.hooks';
import { useNavigate } from 'react-router-dom';

import { rules } from '../../utils/validation.utils';
import { useTranslation } from 'react-i18next';
import { useSignUpUserMutation } from '../../services/auth.api';
import { showToast } from '../../store/toastSlice';
import { ISignUpForm } from '../../types/types';

const SignUp = () => {
  const { handleSubmit, control, setError } = useForm<ISignUpForm>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    await signUpUser(data)
      .unwrap()
      .then(({ login }) => {
        if (login.length) {
          dispatch(showToast({ message: 'Success to Sign Up', type: 'success' }));
          // navigate('/boards');
        }
      })
      .catch((e) => {
        setError('name', { type: 'custom', message: '' });
        setError('login', { type: 'custom', message: '' });
        setError('password', { type: 'custom', message: '' });
        dispatch(showToast({ message: e.data.message }));
      });
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
      <Button type="submit" variant="contained" disabled={isLoading}>
        {t('form.fields.signup')} {isLoading && '...'}
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
