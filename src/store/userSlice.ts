import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getUserService, signInService, signUpService } from '../services/UserService';
import { RootState } from './store';

export type UserState = {
  login: string;
  loggedIn: boolean;
  loading: boolean;
  token: string;
  error: string;
  name: string;
  id: string;
};
export const defaultUserState: UserState = {
  login: '',
  token: '',
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

export const signIn = createAsyncThunk<{ token: string }, ISignInForm>(
  'user/signIn',
  async function ({ login, password }, { rejectWithValue, dispatch }) {
    try {
      const res = await signInService({ login, password });
      if (res.token && res.token.length > 0) {
        const id = JSON.parse(atob(res.token.split('.')[1]))['id']; //temporary, will use instead jwt-decode
        const user = await dispatch(getUser(id));
        if (user) {
          return res;
        }
      }
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
        //if registered
        await dispatch(signIn({ login, password }));
        return res;
      }
      // throw Error('Not knowing error with Sign Up');
      // return res;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return e;
    }
  }
);

export const getUser = createAsyncThunk<{ name: string; _id: string }, string>(
  'user/getUser',
  async function (id, { rejectWithValue }) {
    try {
      return await getUserService(id);
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
      })

      .addMatcher(isRejectedWithValue, (state, action) => {
        state.loading = false;
        state.error = <string>action.payload;
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
