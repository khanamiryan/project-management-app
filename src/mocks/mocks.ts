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
      'userId of invited user #3',
      'userId of invited user #4',
    ],
  },
];

const currentUser = {
  _id: 'testid',
  name: 'TestNameMock',
  login: 'TestLoginMock',
};

const users = [
  {
    _id: 'mockId1',
    name: 'mockName1',
    login: 'mockLogin1',
  },
  {
    _id: 'mockId2',
    name: 'mockName2',
    login: 'mockLogin2',
  },
  {
    _id: 'mockId3',
    name: 'mockName3',
    login: 'mockLogin3',
  },
  {
    _id: 'mockId4',
    name: 'mockName4',
    login: 'mockLogin4',
  },
  {
    _id: 'mockId5',
    name: 'mockName5',
    login: 'mockLogin5',
  },
];

export { boardsSet, currentUser, users };
