import { Link } from '@tanstack/react-router';
import { ButtonLink } from '../../../../common-components/buttons/button-link';
import { useWhoAmI } from '../../api/use-who-am-i';

import './style.css';
import { LogoutButton } from '../logout-button';
import { appRoutes } from '@src/appRoutes';

type AuthActionsProps = {
  className?: string;
  size?: 's' | 'm' | 'l';
};

export const AuthActions = ({
  className = '',
  size = 's',
}: AuthActionsProps) => {
  const { user } = useWhoAmI();
  if (!user) {
    return (
      <div
        className={`auth-actions lm-publisher-center-flex lm-publisher-flex-spacer ${className}`}
      >
        <ButtonLink size={size} to={appRoutes.login} variant="secondary">
          Connexion
        </ButtonLink>
        <ButtonLink size={size} to={appRoutes.signup} variant="secondary">
          Inscription
        </ButtonLink>
      </div>
    );
  }
  return (
    <span
      className={`auth-actions lm-publisher-center-flex lm-publisher-flex-spacer ${className}`}
    >
      <span className="auth-actions__user">
        Bonjour <Link to="/account">{user.username}</Link>,
      </span>
      <LogoutButton size={size} />
    </span>
  );
};
