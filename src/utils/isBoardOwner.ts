// import { currentUser } from 'mocks/mocks';
import { decodedToken } from 'services/api';

export const isBoardOwner = (id: string) => {
  return id === decodedToken.id;
};
