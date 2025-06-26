import { useMemo } from "react";

export type UserRoleProps = {
  role: string;
};

export const UserRole = ({ role }: UserRoleProps) => {
  const userInfo = useMemo(() => {
    switch (role.split('.')[0]) {
      case 'root':
        return {
          color: 'red',
          label: 'Root'
        }
      case 'admin':
        return {
          color: 'purple',
          label: 'Admin'
        };
      default:
        return {
          color: 'blue',
          label: 'Utilisateur'
        };
    }
  }, [role]);

  return (
    <span className={`lmui-badge lmui-badge_tertiary lmui-badge_s lmui-badge_${userInfo.color}`}>{userInfo.label}</span>
  );
};
