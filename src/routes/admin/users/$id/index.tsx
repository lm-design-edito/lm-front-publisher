import { api } from '@api/index';
import { Headline } from '@common/components/headline';
import { Loader } from '@common/components/loader';
import { UserDetail } from '@features/admin-users/components/user-detail';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';

const UserDetailPage = () => {
  const { id } = useParams({ strict: false });
  return (
    <div className="account-page">
      <Headline title="Information utilisateur" />
      {id && <UserDetail userId={id} />}
    </div>
  );
};

export const Route = createFileRoute('/admin/users/$id/')({
  staticData: {
    getBreadcrumb: ({ params }) => (
      <>
        Détails <code>#{params.id}</code>
      </>
    ),
    title: 'Détails',
  },
  component: RouteComponent,
  loader: async ({ context: { queryClient, toaster }, params: { id } }) => {
    const data = await queryClient?.ensureQueryData({
      queryKey: ['user-get', id],
      queryFn: () => api.queries.admin.users.get({ _id: id }),
    });
    //
    if (!data || !data.success) {
      toaster?.showToast({
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
  return <UserDetailPage />;
}
