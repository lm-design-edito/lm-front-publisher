import { createFileRoute, redirect } from '@tanstack/react-router'
import { useUsersList } from '../../../features/admin-users/api/use-users-list';
import Loader from '../../../components/Loader';

const AdminUsersListPage = () => {
  const { list, isLoading } = useUsersList();

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <div>
      {!list.length && (
        <p>Pas d'utilisateurs trouvés.</p>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 && list.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add your users list implementation here */}
    </div>
  );
}

export const Route = createFileRoute('/admin/users/')({
  component: AdminUsersListPage,
  beforeLoad: async ({context}) => {
      if (!context.auth.isLoading && !context.auth.isAuthenticated) {
          throw redirect({
              to: '/login',
              search: {
              redirect: location.href,
            },
          })
      }
      // This is a placeholder for any pre-load logic you might want to implement
      // For example, you could check user permissions or load initial data
      console.log('Loading admin users route...');
    }
})
