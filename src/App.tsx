import Board from 'pages/board/Board';
import Boards from 'pages/boards/Boards';
import Layout from 'pages/layout/Layout';
import MainPage from 'pages/mainPage/MainPage';
import NotFound from 'pages/notFound/NotFound';
import Profile from 'pages/profile/Profile';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import React from 'react';
import { Route, Routes } from 'react-router';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useUser } from './hooks/useUser';
import { useUserInit } from './hooks/useUserInit';

import LoadingBackdrop from './components/LoadingBackdrop/LoadingBackdrop';

function App() {
  const user = useUser();
  const { isLoading } = useUserInit(); //may be some memo or useeffect or change the place?

  // const pages = [
  //   { name: t('menu.mainPage'), url: '/' },
  //   { name: t('menu.boards'), url: '/boards' },
  //   { name: t('menu.profilePage'), url: '/profile' },
  //   { name: t('menu.signIn'), url: '/login' },
  //   { name: t('menu.signUp'), url: '/registration' },
  // ];
  //
  //
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            element={isLoading ? <LoadingBackdrop /> : <ProtectedRoute isAllowed={user.loggedIn} />}
          >
            <Route path="boards" element={<Boards />} />
            <Route path="boards/:id" element={<Board />} />
            <Route path="profile" element={<Profile />} />

            {/*<Route path="/boards/:id" element={<p>This is a page for some board</p>} />*/}
          </Route>
          <Route
            element={
              isLoading ? (
                <LoadingBackdrop />
              ) : (
                <ProtectedRoute isAllowed={!user.loggedIn} redirectPath={'/boards'} />
              )
            }
          >
            <Route path="login" element={<SignIn />} />
            <Route path="registration" element={<SignUp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
/*
           <Route path="*" element={<NotFoundRoute />} />*/
