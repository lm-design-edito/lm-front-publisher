import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api';

type useUserListParams = Parameters<typeof api.queries.admin.users.list>[0];

export function useUserList(params: useUserListParams) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['users-list'],
    queryFn: () => {
      return api.queries.admin.users.list(params);
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
      list: data?.payload || [],
    };
  } else {
    return returnProps;
  }
}
