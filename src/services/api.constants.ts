export const BASE_URL = 'http://localhost:3000/';
// export const BASE_URL = 'https://final-task-backend-production-8f5b.up.railway.app/';

export enum Endpoint {
  BOARDS = 'boards/',
  BOARDS_SET = 'boardsSet/',
  USERS = 'users/',
  COLUMNS = 'columns/',
  COLUMNS_SET = 'columnsSet/',
  TASKS_SET = 'tasksSet',
}

export enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}
