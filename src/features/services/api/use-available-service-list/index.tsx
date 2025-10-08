import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../api';
import { useMemo } from 'react';

export const useAvailableServiceList = (toolBadges: string[]) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['who-am-i'],
    queryFn: () => {
      console.log('useAvailableServiceList.who-am-i');
      return api.queries.auth.whoAmI();
    },
  });

  const availableServices = useMemo(() => {
    if (isLoading) {
      return [];
    }

    if (isSuccess && data.success) {
      const user = data.payload;
      return toolBadges.filter(
        badge =>
          user.role === 'admin' ||
          (user.badges as string[]).includes(badge) ||
          badge === 'all',
      );
    } else {
      return [];
    }
  }, [isSuccess, isLoading, data, toolBadges]);

  return availableServices;
};
