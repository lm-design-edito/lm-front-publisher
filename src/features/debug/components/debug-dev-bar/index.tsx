import { useMutation } from '@tanstack/react-query';
import { useLogout } from '../../../authentification/api/use-logout';
import './style.css';
import { api } from '../../../../api';
import { Link } from '@tanstack/react-router';
import { Loader } from '../../../../common-components/loader';

const devMode = import.meta.env.VITE_DEV_MODE === 'true';

export const DebugDevBar = () => {
  const { mutate: logout, isPending: isPendingLogout } = useLogout();
  // const { mutate: requestEmailVerificationToken, isPending: isPendingRequestEmailVerification } = useMutation({
  //   mutationFn: api.queries.admin.usersUpdate
  // });
  const { mutate: debugRefreshToken, isPending: isPendingDebugRefreshToken } =
    useMutation({
      mutationFn: api.queries.auth.debugRefreshToken,
      onSuccess: () => {
        console.warn(
          'Debug refresh token called, this should not be used in production!',
        );
      },
    });
  if (devMode) {
    return <></>;
  }

  // Queries
  return (
    <div className="dev-bar">
      <span className="dev-bar__title">DEBUG: Dev mode</span>
      <div className="dev-bar__content">
        <div className="dev-bar__category">
          <span className="dev-bar__subtitle">Short cut actions</span>
          <div className="dev-bar__actions">
            <button onClick={() => logout()}>
              Log out {isPendingLogout && <Loader />}
            </button>{' '}
            <button onClick={() => debugRefreshToken()}>
              Refresh tokens {isPendingDebugRefreshToken && <Loader />}
            </button>
          </div>
        </div>
        <div className="dev-bar__category">
          <span className="dev-bar__subtitle">Routes</span>
          <div className="dev-bar__actions">
            <Link to="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
