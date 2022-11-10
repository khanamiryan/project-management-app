import React, { FormEvent } from 'react';
import './SignIn.scss';
import { Box, TextField, Button, Link } from '@mui/material';

const SignIn = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    console.log({
      email: data.get('login'),
      password: data.get('password'),
    });

    //todo: dispatch to signin thunk when it will available
  };
  return (
    <Box component="form" className={'SignInForm'} onSubmit={handleSubmit}>
      <div>
        <TextField
          margin="normal"
          required
          label="Login"
          name="login"
          autoComplete="login"
          // helperText="Incorrect entry."
          // error
          autoFocus
        />
      </div>
      <div>
        <TextField
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          // helperText="Incorrect entry."
          // error
        />
      </div>
      <Button type="submit" variant="contained">
        Sign In
      </Button>
      <div>
        <Link href="/sign-up" margin="normal">
          Dont have an account? Sign Up
        </Link>
      </div>
    </Box>
  );
};

export default SignIn;
