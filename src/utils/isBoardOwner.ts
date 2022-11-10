import { currentUser } from 'mocks/mocks';

export const isBoardOwner = (id: string) => {
  return id === currentUser._id;
};
