import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import setupStore, { RootState } from './store';
import jwt_decode from 'jwt-decode';

import { usersApi } from '../services/users.api';

export type UserState = {
  login: string;
  token: string;
  name: string;
  id: string;
  loggedIn: boolean;
};

const tokenLocalStore = localStorage.getItem('token');
const userId = tokenLocalStore ? (jwt_decode(tokenLocalStore) as DecodedToken).id : '';
const name = usersApi.endpoints.getUser.select(userId);

export const defaultUserState: UserState = {
  login: '',
  token: '',
  loggedIn: false,
  name: '',
  id: '',
};

// export const defaultUserState: UserState = {
//   login: '',
//   token: tokenLocalStore || '',
//   // loggedIn: tokenLocalStore !== null && tokenLocalStore.length > 0,
//   loggedIn: userId && tokenLocalStore ? true : false,
//   name: '',
//   id: userId || '',
// };

export interface ISignInForm {
  login: string;
  password: string;
}
export interface ISignUpForm {
  name: string;
  login: string;
  password: string;
}
export interface IUserInfo {
  name: string;
  login: string;
  id: string;
}
export interface IUserResponse {
  name: string;
  _id: string;
  login: string;
}

export type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    signOut: () => {
      localStorage.removeItem('token');
      console.log('logout', defaultUserState);
      return defaultUserState;
    },
    setToken: (state: UserState, action: PayloadAction<UserState['token']>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        console.log('here', payload);
        return { ...state, ...payload, loggedIn: state.token.length > 0 };
      })
      .addMatcher(usersApi.endpoints.setUserInfo.matchFulfilled, (state, { payload }) => {
        console.log('setUserInfo is Fulfilled', payload);
        // return payload;
        return { ...state, ...payload, loggedIn: state.token.length > 0 };
      })
      .addMatcher(usersApi.endpoints.signInUser.matchFulfilled, (state, { payload: { token } }) => {
        console.log('mayeb');
        state.token = token;
      });
  },
});

export const { signOut, setToken } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
