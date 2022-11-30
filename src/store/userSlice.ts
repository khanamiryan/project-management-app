import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import { AppDispatch, RootState } from './store';

import { authApi } from '../services/auth.api';
import { DecodedToken } from '../types/types';
import jwt_decode from 'jwt-decode';
import { api } from '../services/api';
import { signOut } from '../utils/signOut';

// const tokenLocalStore = localStorage.getItem('token');
// const userId = tokenLocalStore ? (jwt_decode(tokenLocalStore) as DecodedToken).id : '';
// const name = usersApi.endpoints.getUser.select(userId);

interface UserState {
  token: string;
}
export const defaultUserState: UserState = {
  token: '',
};

export const signOutAction = createAsyncThunk('user/signOut', async (_, { dispatch }) => {
  signOut(dispatch);
});

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    signOutReducer: () => {
      return defaultUserState;
    },
    setToken: (state: UserState, action: PayloadAction<UserState['token']>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signInUser.matchFulfilled,
      (state, { payload: { token } }) => {
        state.token = token;
      }
    );
  },
});

export const { signOutReducer, setToken } = userSlice.actions;
export default userSlice.reducer;

/*
  @deprecated use useCurrentUser instead
 */
export const selectUser = ({ user }: RootState) => {
  return {
    id: user.token ? (jwt_decode(user.token) as DecodedToken).id : '',
    token: user.token,
    loggedIn: user.token.length > 0,
  };
};
export const selectUserID = (state: RootState) =>
  state.user.token ? (jwt_decode(state.user.token) as DecodedToken).id : '';
export const selectUserLoggedIn = (state: RootState) => state.user.token.length > 0;
