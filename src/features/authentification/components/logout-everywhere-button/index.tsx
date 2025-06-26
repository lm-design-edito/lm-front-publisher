import { useNavigate } from '@tanstack/react-router';
import { Button } from '../../../../common-components/buttons/Button';
import { useLogoutEverywhere } from '../../api/use-logout-everywhere';

type LogoutEverywhereButtonProps = {
  size?: 's' | 'm' | 'l';
};

export const LogoutEverywhereButton = ({
  size,
}: LogoutEverywhereButtonProps) => {
  const navigate = useNavigate();
  const { mutate: logout, isPending: isPendingLogout } = useLogoutEverywhere({
    onSuccess: () => {
      console.warn('Logout successful, user logged out.');
      navigate({ to: '/' });
    },
    onError: error => {
      console.error('Logout failed:', error);
    },
  });

  return (
    <Button
      size={size}
      onClick={() => logout()}
      variant="secondary"
      isLoading={isPendingLogout}
    >
      Se déconnecter de tous les appareils
    </Button>
  );
};
