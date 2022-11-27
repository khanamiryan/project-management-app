import React from 'react';
import './signIn.scss';
import SignIn from '../../components/SignIn/SignIn';
import { useAppSelector } from '../../store/redux.hooks';
import { selectUser } from '../../store/userSlice';
import { useTranslation } from 'react-i18next';

export default function SignInRoute() {
  const { loggedIn } = useAppSelector(selectUser);
  const { t } = useTranslation();
  return (
    <>
      {<SignIn />}
      {/*{loggedIn ? <h3>You are already logged in</h3> : <SignIn />}*/}
    </>
  );
}
