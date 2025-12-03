import { Loader } from '@common/components/loader';
import { useUserGet } from '@features/admin-users/services/use-user-get';
import { UserUpdateForm } from './user-update-form';

type UserDetailsProps = {
  userId: string;
};

export const UserDetails = ({ userId }: UserDetailsProps) => {
  const { user, uploadQuota, isLoading } = useUserGet({ _id: userId });

  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    return <div>Aucun utilisateur trouvé.</div>;
  }
  /* @ts-expect-error: AdminUsersSuccessPayload is buggy */
  return <UserUpdateForm user={user} uploadQuota={uploadQuota} />;
};
