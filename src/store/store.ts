import {
  Action,
  ThunkAction,
  configureStore,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import { api } from 'services/api';
import userReducer from './userSlice';

export const reducersList = {
  user: userReducer,
  [api.reducerPath]: api.reducer,
};

export const rootReducer = combineReducers(reducersList);

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default setupStore;
