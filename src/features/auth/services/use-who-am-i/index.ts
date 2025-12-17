import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api';

export function useWhoAmI(
  params?: Parameters<typeof api.queries.auth.whoAmI>[0],
) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['who-am-i'],
    queryFn: () => {
      return api.queries.auth.whoAmI(params);
    },
  });

  if (isLoading) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      isError: false,
    };
  }

  if (isSuccess && data.success) {
    return {
      user: {
        ...data.payload,
        status:
          'status' in data.payload && typeof data.payload.status === 'string'
            ? data.payload.status
            : '',
        role:
          'role' in data.payload && typeof data.payload.role === 'string'
            ? data.payload.role
            : '',
        badges:
          'badges' in data.payload && Array.isArray(data.payload.badges)
            ? data.payload.badges
            : [],
      },
      isAuthenticated: true,
      isLoading: false,
      isError: false,
    };
  } else {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isError: true,
    };
  }
}
