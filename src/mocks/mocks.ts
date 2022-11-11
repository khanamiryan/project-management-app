import { Board } from 'types/types';

const boardsSet: Board[] = [
  {
    _id: '13214654646',
    title: 'Board title',
    owner: 'userId of owner',
    users: ['userId of invited user #1'],
  },
  {
    _id: '13131467',
    title: 'Board title',
    owner: 'testid',
    users: ['userId of invited user #1', 'userId of invited user #2'],
  },
  {
    _id: '7464646161',
    title: 'Board title',
    owner: 'testid',
    users: ['userId of invited user #1', 'userId of invited user #2', 'userId of invited user #2'],
  },
  {
    _id: '79746131318744',
    title: 'Board title',
    owner: 'userId of owner',
    users: [
      'userId of invited user #1',
      'userId of invited user #2',
      'userId of invited user #1',
      'userId of invited user #2',
    ],
  },
];

const currentUser = {
  _id: 'testid',
  name: 'TestNameMock',
  login: 'TestLoginMock',
};

export { boardsSet, currentUser };
