import React, { useEffect, useState } from 'react';
import './SignIn.scss';
import { Alert, Box, Button, Link, Snackbar } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { ISignInForm, selectUser, signIn } from '../../store/userSlice';

import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { handleSubmit, control, clearErrors, setError } = useForm<ISignInForm>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => {
            setOpen(false);
          }}
          severity="error"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      <div>
        <InputText
          name="login"
          label="Login"
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
          label="Password"
          type="password"
          autoComplete="password"
        />
      </div>

      <Button type="submit" variant="contained" disabled={loading}>
        Sign In {loading && '...'}
      </Button>
      <div>
        <Link href="/registration" margin="normal">
          Dont have an account? Sign Up
        </Link>
      </div>
    </Box>
  );
};

export default SignIn;
