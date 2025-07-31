import { Badge } from '@common-components/badge';
import { useMemo } from 'react';

export type UserBadgeProps = {
  badge: string;
};

export const UserBadge = ({ badge }: UserBadgeProps) => {
  const color = useMemo(() => {
    switch (badge.split('.')[0]) {
      case 'admin':
        return 'red';
      case 'storage':
        return 'purple';
      default:
        return 'blue';
    }
  }, [badge]);

  return <Badge color={color}>{badge}</Badge>;
};
