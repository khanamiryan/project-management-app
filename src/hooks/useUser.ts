import { useCurrentUser, User } from './useCurrentUser';
//deprecated
export const useUser = (): User => {
  // const user = useAppSelector(selectUser);

  //for comportability
  return useCurrentUser();
};
