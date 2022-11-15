import {
  Action,
  ThunkAction,
  configureStore,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const reducersList = {
  user: userReducer,
};

export const rootReducer = combineReducers(reducersList);

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
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
