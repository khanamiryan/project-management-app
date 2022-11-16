export type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type User = {
  _id: 'string';
  name: 'string';
  login: 'string';
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
