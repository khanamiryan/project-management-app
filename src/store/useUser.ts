import { useMemo } from 'react';
import { selectUser, UserState } from './userSlice';
import { useAppSelector } from './redux.hooks';

export const useUser = (): UserState => {
  const user = useAppSelector(selectUser);
  return useMemo(() => ({ ...user }), [user]);
};
