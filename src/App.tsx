import Board from 'pages/board/Board';
import Boards from 'pages/boards/Boards';
import Layout from 'pages/layout/Layout';
import MainPage from 'pages/mailPage/MainPage';
import NotFound from 'pages/notFound/NotFound';
import Profile from 'pages/profile/Profile';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { getToken } from './utils/getToken';
import jwt_decode from 'jwt-decode';
import { DecodedToken, setToken } from './store/userSlice';
import { usersApi } from './services/users.api';
import { useAppDispatch } from './store/redux.hooks';

const useUserInit = () => {
  const dispatch = useAppDispatch();
  const tokenLocalStore = getToken();
  const userId = tokenLocalStore ? (jwt_decode(tokenLocalStore) as DecodedToken).id : '';
  dispatch(usersApi.endpoints.getUser.initiate(userId));
  dispatch(setToken(tokenLocalStore));
};

function App() {
  useUserInit(); //may be some memo or useeffect or change the place?
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="boards" element={<Boards />} />
          <Route path="boards/:id" element={<Board />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<SignIn />} />
          <Route path="registration" element={<SignUp />} />
          <Route path="/boards/:id" element={<p>This is a page for some board</p>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
/*  
           <Route path="*" element={<NotFoundRoute />} />*/
