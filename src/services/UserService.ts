import axios from 'axios';
import { ISignInForm, ISignUpForm } from '../store/userSlice';
const BASE_URL = 'https://final-task-backend-production-8f5b.up.railway.app/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

export const addBearer = (token: string) => {
  authApi.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
};

export const signInService = async (user: ISignInForm) => {
  const response = await authApi.post('auth/signin', user);
  //////
  addBearer(response.data.token); //definetly need to change the place
  ///////
  return response.data;
};

export const getUserService = async (id: string) => {
  const response = await authApi.get(`users/${id}`);
  return response.data;
};

export const signUpService = async (user: ISignUpForm) => {
  const response = await authApi.post('auth/signup', user);
  return response.data;
};
