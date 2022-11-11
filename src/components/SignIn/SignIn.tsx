import React from 'react';
import './SignIn.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';

interface ISignInForm {
  login: string;
  password: string;
  something: string;
}

const SignIn = () => {
  const { handleSubmit, control } = useForm<ISignInForm>({
    defaultValues: {
      login: '',
      password: '',
      something: '',
    },
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => {
    console.log(data);

    //todo: dispatch to signin thunk when it will available
  };
  return (
    <Box component="form" className={'SignInForm'} onSubmit={handleSubmit(onSubmit)}>
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
              value: 8,
              message: 'Password is too short',
            },
          }}
          margin="normal"
          label="Password"
          type="password"
          autoComplete="password"
        />
      </div>

      <Button type="submit" variant="contained">
        Sign In
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
