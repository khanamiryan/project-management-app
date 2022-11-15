import React from 'react';
import './signIn.scss';
import SignIn from '../../components/SignIn/SignIn';
import { useAppSelector } from '../../store/redux.hooks';
import { selectUser } from '../../store/userSlice';

export default function SignInRoute() {
  const { loggedIn } = useAppSelector(selectUser);
  return (
    <>
      <h2>Sign In</h2>
      {<SignIn />}
      {/*{loggedIn ? <h3>You are already logged in</h3> : <SignIn />}*/}
    </>
  );
}
