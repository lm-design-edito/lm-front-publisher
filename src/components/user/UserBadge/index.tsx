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

  return (
    <span
      className={`lmui-badge lmui-badge_secondary lmui-badge_s lmui-badge_${color}`}
    >
      {badge}
    </span>
  );
};
