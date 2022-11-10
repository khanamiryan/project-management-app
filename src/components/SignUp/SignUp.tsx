import React, { FormEvent } from 'react';
import './SignUp.scss';
import { Box, TextField, Button, Link } from '@mui/material';

const SignUp = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    console.log({
      name: data.get('name'),
      email: data.get('login'),
      password: data.get('password'),
    });

    //todo: dispatch to signUp thunk when it will available
  };
  return (
    <Box component="form" className="SignUpForm" onSubmit={handleSubmit}>
      <div>
        <TextField
          margin="normal"
          required
          label="Name"
          name="name"
          autoComplete="name"
          // helperText="Incorrect entry."
          // error
          autoFocus
        />
      </div>
      <div>
        <TextField
          margin="normal"
          required
          label="Login"
          name="login"
          autoComplete="login"
          // helperText="Incorrect entry."
          // error
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
        <Link href="/sign-in" margin="normal">
          Have an account? Sign in
        </Link>
      </div>
    </Box>
  );
};

export default SignUp;
