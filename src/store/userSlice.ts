import {
  createAsyncThunk,
  createSlice,
  current,
  isPending,
  isRejected,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';
import { signInService, signUpService } from '../services/UserService';
import { RootState } from './store';
import { AxiosError } from 'axios';

export type UserState = {
  login: string;
  name: string;
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
  name: '',
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

export const signIn = createAsyncThunk<{ token: string }, ISignInForm>(
  'user/signIn',
  async function ({ login, password }, { rejectWithValue, dispatch }) {
    try {
      return await signInService({ login, password });
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return e;
    }
  }
);
export const signUp = createAsyncThunk<{ _id: string }, ISignUpForm>(
  'user/signUp',
  async function ({ name, login, password }, { dispatch, rejectWithValue }) {
    try {
      const res = await signUpService({ name, login, password });
      if (res._id) {
        await dispatch(signIn({ login, password }));
      }
      return res;
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

    signOut: () => {
      return defaultUserState;
    },
    editUserInfo: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        console.log('sigin', action);
        const { payload } = action;

        state.token = payload.token;
        if (payload.token.length > 0) {
          state.loggedIn = payload.token.length > 0;
          state.login = action.meta.arg.login;
        }
        state.loading = false;
        //   may be  jwt decode to prove login?
      })

      // .addCase(signIn.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = <string>action.payload;
      // })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log(action);
        //if (action.payload._id.length > 0) {
        // dispatch(signIn);
        //}
      })
      .addMatcher(isRejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = <string>action.payload;
      })
      .addMatcher(isRejectedWithValue, (state, action) => {
        console.log('rejectedwithvalue', action);
        state.loading = false;
        state.error = <string>action.payload;
      })
      .addMatcher(isPending, (state) => {
        console.log('pendnf');
        state.loading = true;
        //I think in the future loading will be one for all
        state.error = '';
      });
  },
});

export const { setUser, signOut, editUserInfo, setToken } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
