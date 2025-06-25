import { useMemo } from "react";

type UserStatusProps = {
  status: string;
};

export const UserStatus = ({ status }: UserStatusProps) => {
  const statusInfo = useMemo(() => {
    switch (status) {
    case 'active':
        return {
            color: 'green',
            label: 'Actif'
        }
    case 'suspended':
        return {
            color: 'orange',
            label: 'Suspendu'
        }
    case 'banned':
        return {
            color: 'red',
            label: 'Banni'
        }
      default:
        return {
            color: 'grey',
            label: 'Inconnu'
        }
    }
  }, [status]);

  return (
    <span className={`lmui-badge lmui-badge_secondary lmui-badge_s lmui-badge_${statusInfo.color}`}>{statusInfo.label}</span>
  );
};