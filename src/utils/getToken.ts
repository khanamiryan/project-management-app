import { RootState } from '../store/store';

export const getToken = (): string => {
  return localStorage.getItem('token') || '';
};
