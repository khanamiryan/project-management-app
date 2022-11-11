import React from 'react';
import './SignUp.scss';
import { Box, Button, Link } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';

interface ISignUpForm {
  name: string;
  login: string;
  password: string;
}

const SignUp = () => {
  const { handleSubmit, control } = useForm<ISignUpForm>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
    console.log(data);

    //todo: dispatch to signUp thunk when it will available
  };
  return (
    <Box component="form" className="SignUpForm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputText
          control={control}
          margin="normal"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
      </div>
      <div>
        <InputText
          control={control}
          margin="normal"
          label="Login"
          name="login"
          autoComplete="login"
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
        />
      </div>
      <Button type="submit" variant="contained">
        Sign In
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
