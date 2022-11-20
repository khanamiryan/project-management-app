import { useAppDispatch } from '../store/redux.hooks';
import { getToken } from '../utils/getToken';
import jwt_decode from 'jwt-decode';
import { setToken } from '../store/userSlice';
import { usersApi } from '../services/users.api';
import { DecodedToken } from '../types/types';

export const useUserInit = () => {
  const dispatch = useAppDispatch();
  const tokenLocalStore = getToken();
  const userId = tokenLocalStore ? (jwt_decode(tokenLocalStore) as DecodedToken).id : '';
  dispatch(usersApi.endpoints.getUser.initiate(userId));
  dispatch(setToken(tokenLocalStore));
};
