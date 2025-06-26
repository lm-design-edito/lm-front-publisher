import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api';

type useUserListParams = Parameters<typeof api.queries.admin.usersList>[0];
type useUserListReturn = {
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
export function useUserList(params?: useUserListParams): useUserListReturn {
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
