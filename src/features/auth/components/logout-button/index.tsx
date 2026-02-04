import { useNavigate } from '@tanstack/react-router';
import { Button } from '@common/components/buttons/button';
import { useLogout } from '../../services/use-logout';
import { appRoutes } from '@src/appRoutes';
import { useToastContext } from '@common/hooks/useToastContext';

type LogoutButtonProps = {
  size?: 's' | 'm' | 'l';
};

export const LogoutButton = ({ size }: LogoutButtonProps) => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { mutate: logout, isPending: isPendingLogout } = useLogout({
    onSuccess: () => {
      showToast({
        type: 'success',
        message: 'Vous êtes déconnecté',
      });
      navigate({ to: appRoutes.index });
    },
    onError: () => {
      showToast({
        type: 'error',
        message: 'Erreur lors de la déconnexion',
      });
    },
  });

  return (
    <Button
      size={size}
      onClick={() => logout()}
      variant="secondary"
      isLoading={isPendingLogout}
    >
      Se déconnecter
    </Button>
  );
};
