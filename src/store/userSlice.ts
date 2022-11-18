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

export type UserState = {
  login: string;
  loggedIn: boolean;
  loading: boolean;
  token: string;
  error: string;
  name: string;
  id: string;
};

const tokenLocalStor = localStorage.getItem('token');
export const defaultUserState: UserState = {
  login: '',
  token: tokenLocalStor || '',
  loggedIn: false,
  loading: false,
  error: '',
  name: '',
  id: '',
};

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
  password: string;
}
export interface IUserResponse {
  name: string;
  _id: string;
  login: string;
}
type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

export const signIn = createAsyncThunk<{ token: string }, ISignInForm>(
  'user/signIn',
  async function ({ login, password }, { dispatch }) {
    const res = await signInService({ login, password });
    if (res.token && res.token.length > 0) {
      // const id = JSON.parse(atob(res.token.split('.')[1]))['id']; //temporary, will use instead jwt-decode
      localStorage.setItem('token', res.token);
      const id = (jwt_decode(res.token) as DecodedToken).id;
      const user = await dispatch(getUser(id));
      if (user) {
        return res;
      }
    }
  }
);
export const signUp = createAsyncThunk<{ _id: string }, ISignUpForm>(
  'user/signUp',
  async function ({ name, login, password }, { dispatch }) {
    const res = await signUpService({ name, login, password });
    if (res._id) {
      //if registered
      await dispatch(signIn({ login, password }));
      return res;
    }
  }
);

export const getUser = createAsyncThunk<IUserResponse, string>('user/getUser', async function (id) {
  return await getUserService(id);
});
export const setUserInfo = createAsyncThunk<
  IUserResponse,
  IUserInfo,
  { state: { user: UserState } }
>('user/setUserInfo', async function (userInfo, { getState }) {
  const { id } = getState().user;
  return await setUserInfoService(id, userInfo);
});

export const deleteUser = createAsyncThunk<{ name: string }, string>(
  'user/deleteUser',
  async function (id) {
    return await deleteUserService(id);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    setToken: (state: UserState, action: PayloadAction<UserState['token']>) => {
      state.token = action.payload;
      state.loggedIn = action.payload.length > 0;
    },
    setUser: (state: UserState, action: PayloadAction<UserState['login']>) => {
      state.login = action.payload;
    },
    signOut: () => {
      //remove also from localstorage
      return defaultUserState;
    },
    editUserInfo: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        const {
          payload: { token },
          meta,
        } = action;
        state.token = token;
        state.loading = false;

        if (token.length > 0) {
          state.loggedIn = token.length > 0;
          state.login = meta.arg.login;
        }
        //   may be  jwt decode to prove login?
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.id = action.payload._id;
        state.login = action.payload.login;
      })
      .addCase(setUserInfo.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.login = action.payload.login;
        state.id = action.payload._id;
      })
      .addMatcher(isFulfilled, (state) => {
        //for all fullfilled
        state.loading = false;
        state.error = '';
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = <string>action.error.message;
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
        //I think in the future loading will be one for all
        state.error = '';
      });
  },
});

export const { setUser, signOut, editUserInfo, setToken } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
