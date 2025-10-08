import { Text } from '@common-components/text';
import { useWhoAmI } from '@features/auth/api';
import { appRoutes } from '@src/appRoutes';
import { Link, useLocation } from '@tanstack/react-router';
import './styles.css';

export const UnverifiedUserBanner = () => {
  const location = useLocation();
  const { user } = useWhoAmI();

  if (
    user &&
    !user.verified &&
    !location.pathname.includes(appRoutes.verifyEmail)
  ) {
    return (
      <div className="unverified-user-banner">
        <Text size="sm">
          Attention, votre compte n'est pas vérifié, il est possible que
          certainnes fonctionnalités soient desactivés.{' '}
          <Link
            to={appRoutes.verifyEmail}
            search={{
              email: user.email,
            }}
          >
            Vérifiez votre Email
          </Link>
        </Text>
      </div>
    );
  }
  return null;
};
