import { useMemo } from 'react';
import { Loader } from '../../../../common-components/loader';
import { useWhoAmI } from '../../../authentification/api/use-who-am-i';
import { useUserList } from '../../api/use-user-list';
import './style.css';
import {
  Table,
  type Column,
  type Row,
} from '../../../../common-components/tables/Table';
import { Button } from '../../../../common-components/buttons/button';
import { UserBadge } from '../../../../common-components/user/UserBadge';
import { UserStatus } from '../../../../common-components/user/UserStatus';
import { UserVerified } from '../../../../common-components/user/UserVerified';
import { UserRole } from '../../../../common-components/user/UserRole';

export type UserListRow = {
  _id: string;
  username: string;
  email: string;
  role: string;
  verified: boolean;
  status?: string; // Optional status field
  badges: string[];
  actions?: React.ReactNode;
};

export const UserList = () => {
  const { user } = useWhoAmI();
  const { list, isLoading } = useUserList();

  const userList = useMemo(() => {
    const adminUser = user && user.role === 'admin' ? user : null;
    // Sort badges alphabetically
    return [adminUser, ...list]
      .map(user =>
        user
          ? {
            ...user,
            badges:
              user && 'badges' in user && user.badges
                ? user.badges.sort((a, b) => (a > b ? 1 : -1))
                : [],
          }
          : null,
      )
      .filter(user => user !== null);
  }, [list, user]);

  const columns: Column<UserListRow>[] = useMemo(
    () => [
      { id: '_id', label: 'ID' },
      { id: 'username', label: 'Username' },
      { id: 'email', label: 'Email' },
      {
        id: 'role',
        label: 'Role',
        cell: {
          render: row => <UserRole role={row.role || ''} />,
        },
      },
      {
        id: 'status',
        label: 'Status',
        cell: {
          render: row =>
            row.status ? <UserStatus status={row.status || ''} /> : null,
        },
      },
      {
        id: 'verified',
        label: 'État',
        cell: {
          render: row => <UserVerified verified={row.verified} />,
        },
      },
      {
        id: 'badges',
        label: 'Badges',
        cell: {
          className: 'users-list__badges-cell',
          render: row =>
            row.badges ? (
              <>
                <span>Voir la liste</span>
                <div className="users-list__badges">
                  {row.badges.map(badge => (
                    <UserBadge key={badge} badge={badge} />
                  ))}
                </div>
              </>
            ) : (
              <span>Aucun badge</span>
            ),
        },
      },
      {
        id: 'actions',
        label: 'Actions',
        cell: {
          className: 'users-list__actions-cell',
          render: () => (
            <div className="users-list__actions lm-publisher-center-flex lm-publisher-flex-spacer">
              <Button size="s" variant="secondary">
                Modifier
              </Button>
              <Button size="s" variant="secondary" color="warning">
                Suspendre
              </Button>
              <Button size="s" variant="secondary" color="danger">
                Bannir
              </Button>
            </div>
          ),
        },
      },
    ],
    [],
  );

  const rows: Row<UserListRow>[] = useMemo(
    () =>
      userList.map(user => ({
        ...user,
        rowId: user._id, // Unique identifier for the row
      })),
    [userList],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table
      title="Liste des utilisateurs"
      className="users-list"
      emptyRowsLabel="Pas d'utilisateurs trouvés."
      columns={columns}
      rows={rows}
    />
  );
};
