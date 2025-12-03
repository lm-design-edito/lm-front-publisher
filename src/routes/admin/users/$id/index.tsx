import { api } from '@api/index';
import { Headline } from '@common/components/headline';
import { Loader } from '@common/components/loader';
import { UserDetails } from '@features/admin-users/components/user-details';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';

const UserDetailsPage = () => {
  const { id } = useParams({ strict: false });
  return (
    <div className="account-page">
      <Headline
        breadcrumbs={
          /* @todo: make an auto comp for his */
          <>
            <Link to="/admin/users">Liste des utilisateurs</Link>
            <Link
              to="/admin/users/$id"
              params={{
                id: id || '',
              }}
            >
              Profil utilisateur
            </Link>
          </>
        }
        title="Information utilisateur"
      />
      {id && <UserDetails userId={id} />}
    </div>
  );
};

export const Route = createFileRoute('/admin/users/$id/')({
  component: RouteComponent,
  loader: async ({ context: { queryClient, toaster }, params: { id } }) => {
    const data = await queryClient.ensureQueryData({
      queryKey: ['user-get', id],
      queryFn: () => api.queries.admin.users.get({ _id: id }),
    });
    //
    if (!data.success) {
      toaster.showToast({
        type: 'error',
        message: (
          <>
            Aucun utilisateur trouvé avec l'id: <code>{id}</code>
          </>
        ),
      });
      return redirect({ to: '/admin/users' });
    }
    return <Loader />;
  },
});

function RouteComponent() {
  return <UserDetailsPage />;
}
