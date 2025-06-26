import { createFileRoute, redirect } from '@tanstack/react-router';
import { UsersList } from '../../../features/admin-users/components/UsersList';
import { Headline } from '../../../components/Headline';

const AdminUsersListPage = () => {
  return (
    <div className="admin-users-list-page">
      <Headline title="Gestion des utilisateurs" />
      <UsersList />
    </div>
  );
};

export const Route = createFileRoute('/admin/users/')({
  component: AdminUsersListPage,
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
