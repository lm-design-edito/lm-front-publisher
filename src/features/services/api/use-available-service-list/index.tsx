import { useMemo } from 'react';
import { useWhoAmI } from '@features/auth';

export const useAvailableServiceList = (toolBadges: string[]) => {
  const { user, isLoading } = useWhoAmI();

  const availableServices = useMemo(() => {
    if (isLoading) {
      return [];
    }

    if (user) {
      return toolBadges.filter(
        badge =>
          user.role === 'admin' ||
          (user.badges as string[]).includes(badge) ||
          badge === 'all',
      );
    } else {
      return [];
    }
  }, [user, isLoading, toolBadges]);

  return availableServices;
};
