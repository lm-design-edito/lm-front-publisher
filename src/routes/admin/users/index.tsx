import { createFileRoute, redirect } from '@tanstack/react-router';
import { UserList } from '@features/admin-users';
import { Headline } from '../../../common-components/headline';

const AdminUserListPage = () => {
  return (
    <div className="admin-users-list-page">
      <Headline title="Gestion des utilisateurs" />
      <UserList />
    </div>
  );
};

export const Route = createFileRoute('/admin/users/')({
  component: AdminUserListPage,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && !context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
    // This is a placeholder for any pre-load logic you might want to implement
    // For example, you could check user permissions or load initial data
    console.log('Loading admin users route...');
  },
});
