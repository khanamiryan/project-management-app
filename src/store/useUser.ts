import { useMemo } from 'react';
import { DecodedToken, IUserInfo, selectUser, UserState } from './userSlice';
import { useAppDispatch, useAppSelector } from './redux.hooks';

export const useUser = (): UserState => {
  const user = useAppSelector(selectUser);
  // const dispatch = useAppDispatch();
  // const tokenLocalStore = localStorage.getItem('token');
  // const userId = tokenLocalStore ? (jwt_decode(tokenLocalStore) as DecodedToken).id : '';
  // // const user = (await usersApi.endpoints.getUser.useQuery(userId).data) as UserState;

  return useMemo(() => ({ ...user }), [user]);
};
