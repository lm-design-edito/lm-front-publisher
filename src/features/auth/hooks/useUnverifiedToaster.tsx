import { useToastContext } from '@common/hooks/useToastContext';
import { useWhoAmI } from '../api';
import { useEffect, useMemo } from 'react';
import { appRoutes } from '@src/appRoutes';
import { Link, useLocation } from '@tanstack/react-router';

export const useUnverifiedToaster = () => {
  const location = useLocation();
  const { user } = useWhoAmI();
  const { showToast, hideToast } = useToastContext();

  const needsToDisplayToaster = useMemo(
    () =>
      user &&
      !user.verified &&
      !location.pathname.includes(appRoutes.verifyEmail),
    [user, location.pathname],
  );

  useEffect(() => {
    if (needsToDisplayToaster) {
      showToast({
        id: 'unverified-user-toaster',
        message: "Votre compte n'est pas vérifié.",
        icon: 'danger',
        description: (
          <>
            Certaines fonctionnalités seront peut-être désactivées tant que vous
            n'avez pas vérifié votre email.{' '}
            <Link
              to={appRoutes.verifyEmail}
              search={{
                email: user && 'email' in user ? user?.email : '',
              }}
            >
              Vérifier mon email
            </Link>
          </>
        ),
        type: 'warning',
        duration: 0,
      });
    } else {
      hideToast('unverified-user-toaster');
    }
    return () => {
      hideToast('unverified-user-toaster');
    };
  }, [user, needsToDisplayToaster, showToast, hideToast]);
};
