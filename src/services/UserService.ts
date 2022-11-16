import axios from 'axios';
import { ISignInForm, ISignUpForm, IUserInfo } from '../store/userSlice';
// const BASE_URL = 'https://final-task-backend-production-8f5b.up.railway.app/';
const BASE_URL = 'http://localhost:3001/';
export const authApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

export const addBearer = (token: string) => {
  //what if I will need another header?
  authApi.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
};
//because axios hides error message from server
authApi.interceptors.response.use(
  (response) => response,
  function (error) {
    error.message = error.response.data.message || error.message;
    return Promise.reject(error);
  }
);

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

export const setUserInfoService = async (id: string, user: IUserInfo) => {
  const response = await authApi.put(`users/${id}`, user);
  return response.data;
};

export const deleteUserService = async (id: string) => {
  const response = await authApi.delete(`users/${id}`);
  return response.data;
};
