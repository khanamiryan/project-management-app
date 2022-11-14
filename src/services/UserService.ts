import axios from 'axios';
const BASE_URL = 'https://final-task-backend-production-8f5b.up.railway.app/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

export const loginUserService = async (user: { login: string; password: string }) => {
  const response = await authApi.post('auth/signin', user);
  return response.data;
};
