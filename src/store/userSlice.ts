import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { loginUserService } from '../services/UserService';
import { RootState } from './store';

export type UserState = {
  login: string;
  loggedIn: boolean;
  loading: boolean;
  token: string;
  error: string;
};
export const defaultUserState: UserState = {
  login: '',
  token: '',
  loggedIn: false,
  loading: false,
  error: '',
};

export interface ISignInForm {
  login: string;
  password: string;
}

export const signIn = createAsyncThunk<{ token: string }, ISignInForm>(
  'user/signIn',
  async function ({ login, password }, { rejectWithValue, dispatch }) {
    try {
      return await loginUserService({
        login: login,
        password: password,
      });
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return e;
    }
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

    signOut: (state: UserState) => {
      return defaultUserState;
    },
    editUserInfo: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action);
        const { payload } = action;

        state.token = payload.token;
        if (payload.token.length > 0) {
          state.loggedIn = payload.token.length > 0;
          state.login = action.meta.arg.login;
        }
        state.loading = false;
        //   may be  jwt decode to prove login?
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true; //I think in the future loading will be one for all
        state.error = '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload;
      });
  },
});

export const { setUser, signOut, editUserInfo, setToken } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
