export type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type User = {
  _id: string;
  name: string;
  login: string;
};

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export type UserState = {
  login: string;
  token: string;
  name: string;
  id: string;
  loggedIn: boolean;
};

export interface ISignInForm {
  login: string;
  password: string;
}

export interface ISignUpForm {
  name: string;
  login: string;
  password: string;
}

export interface IUserInfo {
  name: string;
  login: string;
  id: string;
}

export interface IUserResponse {
  name: string;
  _id: string;
  login: string;
}
export type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

export type BoardFormFields = { title: string; users: string[] };
