import { useMemo } from "react";
import Loader from "../../../../components/Loader";
import { useWhoAmI } from "../../../authentification/api/use-who-am-i";
import { useUsersList } from "../../api/use-users-list";
import './style.css';
import Table, { type Column, type Row } from "../../../../components/tables/Table";

const UserBadge = ({ badge }: { badge: string }) => {
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
    <span className={`lmui-badge lmui-badge_secondary lmui-badge_s lmui-badge_${color}`}>{badge}</span>
  );
};

const UserStatus = ({ verified }: { verified: boolean }) => {
  const color = useMemo(() => verified ? 'green' : 'red', [verified]);

  return (
    <span className={`lmui-badge lmui-badge_secondary lmui-badge_s lmui-badge_${color}`}>{verified ? 'Vérifié' : 'Non vérifié'}</span>
  );
}


const UsersList = () => {
  const { user } = useWhoAmI();
  const { list, isLoading } = useUsersList();

  const userList = useMemo(() => {
    const adminUser = user && user.role === 'admin' ? user : null;
    return [
      adminUser,
      ...list,
    ].map((user) => (user ? {
      ...user,
      badges: user && 'badges' in user && user.badges ? user.badges.sort((a, b) => a > b ? 1 : -1) : [], // Sort badges alphabetically
    } : null)).filter((user) => user !== null);
  }, [list, user])

  const columns: Column<typeof userList[0]>[] = useMemo(() => (
    [
      { id: '_id', label: 'ID' },
      { id: 'username', label: 'Username' },
      { id: 'email', label: 'Email' },
      { id: 'role', label: 'Role' },
      {
        id: 'verified', label: 'Status', cell: {
          render: (row) => <UserStatus verified={row.verified} />
        }
      },
      {
        id: 'badges', label: 'Badges', cell: {
          className: 'users-list__badges-cell',
          render: (row) => row.badges ? (
            <>
              <span>Voir la liste</span>
              <div className="users-list__badges">
                {row.badges.map((badge) => <UserBadge key={badge} badge={badge} />)}
              </div>
            </>
          ) : <span>Aucun badge</span>

        }
      },
    ]
  ), [])

  const rows: Row<typeof userList[0]>[] = useMemo(() => (
    userList.map((user) => ({
      ...user,
      rowId: user._id, // Unique identifier for the row
    }))
  ), [userList]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <Table
      title="Liste des utilisateurs"
      className="users-list"
      emptyRowsLabel="Pas d'utilisateurs trouvés."
      columns={columns}
      rows={rows}
    />
  )
}
export default UsersList;