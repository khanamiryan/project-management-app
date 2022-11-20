import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import jwt_decode from 'jwt-decode';

import { usersApi } from '../services/users.api';
import { authApi } from '../services/auth.api';
import { DecodedToken, UserState } from '../types/types';

// const tokenLocalStore = localStorage.getItem('token');
// const userId = tokenLocalStore ? (jwt_decode(tokenLocalStore) as DecodedToken).id : '';
// const name = usersApi.endpoints.getUser.select(userId);

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

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    signOutReducer: () => {
      localStorage.removeItem('token');
      return defaultUserState;
    },
    setToken: (state: UserState, action: PayloadAction<UserState['token']>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        return { ...state, ...payload, loggedIn: state.token.length > 0 };
      })
      .addMatcher(usersApi.endpoints.setUserInfo.matchFulfilled, (state, { payload }) => {
        return { ...state, ...payload, loggedIn: state.token.length > 0 };
      })
      .addMatcher(authApi.endpoints.signInUser.matchFulfilled, (state, { payload: { token } }) => {
        state.token = token;
      });
  },
});

export const { signOutReducer, setToken } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
