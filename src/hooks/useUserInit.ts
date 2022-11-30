import { useAppDispatch, useAppSelector } from '../store/redux.hooks';
import { getToken } from '../utils/getToken';
import jwt_decode from 'jwt-decode';
import { selectUser, setToken } from '../store/userSlice';
import { useGetUserQuery } from '../services/users.api';
import { DecodedToken } from '../types/types';
import { useEffect } from 'react';

export const useUserInit = () => {
  //may be add in future memoization and return of user select, or fully change the way of working this
  const dispatch = useAppDispatch();
  const tokenLocalStore = useAppSelector(selectUser).token;
  const userId = useAppSelector(selectUser).id; //tokenLocalStore ? (jwt_decode(tokenLocalStore) as DecodedToken).id : '';
  const { isLoading } = useGetUserQuery(userId, { skip: userId.length === 0 });

  // useEffect(() => {
  //   console.log('here', isLoading, tokenLocalStore, userId);
  //   if (userId) {
  //     console.log(tokenLocalStore);
  //     // dispatch(setToken(tokenLocalStore));
  //   }
  // }, [tokenLocalStore, userId]);

  return { isLoading };
};
