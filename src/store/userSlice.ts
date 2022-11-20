import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  getUserService,
  signInService,
  signUpService,
  deleteUserService,
  setUserInfoService,
} from '../services/UserService';
import { RootState } from './store';
import jwt_decode from 'jwt-decode';

import { usersApi } from '../services/users.api';
import { api } from '../services/api';

export type UserState = {
  login: string;
  token: string;
  name: string;
  id: string;
  loggedIn: boolean;
};

const tokenLocalStore = localStorage.getItem('token');

export const defaultUserState: UserState = {
  login: '',
  token: tokenLocalStore || '',
  // loggedIn: tokenLocalStore !== null && tokenLocalStore.length > 0,
  loggedIn: false,
  name: '',
  id: '',
};
//for future export type LoginInput = TypeOf<typeof loginSchema>;
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
// export const signIn = createAsyncThunk<{ token: string }, ISignInForm>(
//   'user/signIn',
//   async function ({ login, password }, { dispatch }) {
//     const res = await signInService({ login, password });
//     if (res.token && res.token.length > 0) {
//       // const id = JSON.parse(atob(res.token.split('.')[1]))['id']; //temporary, will use instead jwt-decode
//       localStorage.setItem('token', res.token);
//       const id = (jwt_decode(res.token) as DecodedToken).id;
//       const user = await dispatch(getUser(id));
//       if (user) {
//         return res;
//       }
//     }
//   }
// );
// export const signUp = createAsyncThunk<{ _id: string }, ISignUpForm>(
//   'user/signUp',
//   async function ({ name, login, password }, { dispatch }) {
//     const res = await signUpService({ name, login, password });
//     if (res._id) {
//       //if registered
//       // await dispatch(signIn({ login, password }));
//       return res;
//     }
//   }
// );

// export const getUser = createAsyncThunk<IUserResponse, string>('user/getUser', async function (id) {
//   return await getUserService(id);
// });
// export const setUserInfo = createAsyncThunk<
//   IUserResponse,
//   IUserInfo,
//   { state: { user: UserState } }
// >('user/setUserInfo', async function (userInfo, { getState }) {
//   const { id } = getState().user;
//   return await setUserInfoService(id, userInfo);
// });

// export const deleteUser = createAsyncThunk<{ name: string }, string>(
//   'user/deleteUser',
//   async function (id) {
//     return await deleteUserService(id);
//   }
// );

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    signOut: () => {
      localStorage.removeItem('token');
      // dispatch(api.util.resetApiState());
      return defaultUserState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        return { ...state, ...payload, loggedIn: state.token.length > 0 };
      })
      .addMatcher(usersApi.endpoints.signInUser.matchFulfilled, (state, { payload: { token } }) => {
        state.token = token;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
