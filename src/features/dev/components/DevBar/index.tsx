import { useMutation } from '@tanstack/react-query';
import { useLogin } from '../../../authentification/api/use-login';
import { useLogout } from '../../../authentification/api/use-logout';
import './style.css'
import { api } from '../../../../api';
import { Link } from '@tanstack/react-router';
import Loader from '../../../../components/Loader';

const devMode = import.meta.env.VITE_DEV_MODE === 'true';

const DevBar = () => {
    const { mutate: login, isPending: isPendingLoading } = useLogin();
    const { mutate: logout, isPending: isPendingLogout } = useLogout();
    const { mutate: requestEmailVerificationToken, isPending: isPendingRequestEmailVerification } = useMutation({
      mutationFn: api.queries.admin.usersUpdate
    });
    if (devMode) {
        return <></>;
    }

    // Queries
    return <div className='dev-bar'>
        <span className="dev-bar__title">Dev mode</span>
        <div className="dev-bar__content">
            <div className="dev-bar__category">
                <span className="dev-bar__subtitle">Short cut actions</span>
                <div className="dev-bar__actions">
                    <button onClick={() => login({ email: 'fabas@lemonde.fr', password: 'admin' })}>Login to MAIN_ADMIN {isPendingLoading && <Loader />}</button>
                    <button onClick={() => logout()}>Log out {isPendingLogout && <Loader />}</button>
                    <button onClick={() => requestEmailVerificationToken({ _id: '684046820cafdeda64c90716', verified: true  })}>Verify user lea {isPendingRequestEmailVerification && <Loader />}</button>
                </div>
            </div>
            <div className="dev-bar__category">
                <span className="dev-bar__subtitle">Public Routes</span>
                <div className="dev-bar__actions">
                    <Link to="/signup">Sign up</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
            <div className="dev-bar__category">
                <span className="dev-bar__subtitle">Admin Routes</span>
                <div className="dev-bar__actions">
                    <Link to="/admin">Admin</Link>
                    <Link to="/admin/users">Liste users</Link>
                </div>
            </div>
            <div className="dev-bar__category">
                <span className="dev-bar__subtitle">Images Routes</span>
                <div className="dev-bar__actions">
                    <Link to="/images/formatter">Images formatter</Link>
                </div>
            </div>
        </div>
    </div>
}

export default  DevBar;