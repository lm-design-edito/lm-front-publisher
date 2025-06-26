import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api';

type UseUsersListParams = Parameters<typeof api.queries.admin.usersList>[0];
type UseUsersListReturn = {
  isLoading: boolean;
  list: {
    _id: string;
    role: string;
    username: string;
    email: string;
    badges: string[];
    verified: boolean;
  }[];
};
export function useUsersList(params?: UseUsersListParams): UseUsersListReturn {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['users-list'],
    queryFn: () => {
      return api.queries.admin.usersList(params);
    },
  });

  const returnProps = {
    isLoading,
    list: [],
  };

  if (isLoading) {
    return returnProps;
  }

  if (isSuccess && data.success) {
    return {
      ...returnProps,
      list: data?.payload.list || [],
    };
  } else {
    return returnProps;
  }
}
