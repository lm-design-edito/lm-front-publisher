import { createFileRoute } from '@tanstack/react-router';
import { UserList } from '@features/admin-users';
import { Headline } from '@common/components/headline';
import { checkForAuthentifacted } from '@src/route-middleware';

const AdminUserListPage = () => {
  return (
    <div className="admin-users-list-page">
      <Headline title="Gestion des utilisateurs" />
      <UserList />
    </div>
  );
};

export const Route = createFileRoute('/admin/users/')({
  staticData: {
    title: 'Gestion des utilisateurs',
  },
  component: AdminUserListPage,
  beforeLoad: async ({ context }) => {
    checkForAuthentifacted({ context });
    // This is a placeholder for any pre-load logic you might want to implement
    // For example, you could check user permissions or load initial data
    console.log('Loading admin users route...');
  },
});
