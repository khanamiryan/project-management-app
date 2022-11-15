import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import jwt_decode from 'jwt-decode';

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};
const BASE_URL = 'http://localhost:3000/';
export const token =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzM5NGZmMGRlZmQxMTAzMmM3Mjg4MyIsImxvZ2luIjoiU3R1ZGVudDEiLCJpYXQiOjE2Njg1MTk0OTMsImV4cCI6MTY2ODU2MjY5M30.n_RAvkSf1EZYWLr_8PiMVCPciOx4ZAs2q5HEThf2H-I';
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmNkMDc0OTYyNzRiZWJmNzYwYTA3MCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg0OTUxNzksImV4cCI6MTY2ODUzODM3OX0.UnwKv3tMhiYa_4792uM1YQhQz6-vswTgP27ehZX_21s';
export const decodedToken: DecodedToken = jwt_decode(token);

export enum Endpoint {
  BOARDS = 'boards/',
  BOARDS_SET = 'boardsSet/',
  USERS = 'users/',
}

export enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${token}`);
    },
  }),
  tagTypes: ['Boards'],
  endpoints: () => ({}),
});
