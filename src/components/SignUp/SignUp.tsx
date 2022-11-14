import React, { useEffect, useState } from 'react';
import './SignUp.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { ISignUpForm, selectUser, signUp } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import { useNavigate } from 'react-router-dom';
import Toast from '../Toast/Toast';

const SignUp = () => {
  const { handleSubmit, control, setError } = useForm<ISignUpForm>({
    defaultValues: {
      name: '',
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
      setError('name', { type: 'custom', message: '' });
      setError('login', { type: 'custom', message: '' });
      setError('password', { type: 'custom', message: '' });
      setOpen(true);
      setMessage(error);
    }
  }, [error]);

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    await dispatch(signUp(data));
  };
  return (
    <Box component="form" className="SignUpForm" onSubmit={handleSubmit(onSubmit)}>
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
          control={control}
          margin="normal"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name is too short',
            },
          }}
        />
      </div>
      <div>
        <InputText
          control={control}
          margin="normal"
          label="Login"
          name="login"
          autoComplete="login"
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
          control={control}
          margin="normal"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password is too short',
            },
          }}
        />
      </div>
      <Button type="submit" variant="contained" disabled={loading}>
        Sign Up {loading && '...'}
      </Button>
      <div>
        <Link href="/login" margin="normal">
          Have an account? Sign in
        </Link>
      </div>
    </Box>
  );
};

export default SignUp;
