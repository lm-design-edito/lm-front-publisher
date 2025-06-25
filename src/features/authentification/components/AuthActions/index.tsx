import { useNavigate } from "@tanstack/react-router";
import Button from "../../../../components/buttons/Button";
import ButtonLink from "../../../../components/buttons/ButtonLink";
import { useLogout } from "../../api/use-logout";
import { useWhoAmI } from "../../api/use-who-am-i";

import './style.css';

type AuthActionsProps = {
    className?: string;
    size?: 's' | 'm' | 'l';
}

export const AuthActions = ({ className, size = 's' }: AuthActionsProps) => {
    const navigate = useNavigate();
    const { mutate: logout, isPending: isPendingLogout } = useLogout({
        onSuccess: () => {
            console.warn("Logout successful, user logged out.");
            navigate({ to: '/' });
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });
    const { user } = useWhoAmI();
    if (!user) {
        return <div className={`auth-actions lm-publisher-center-flex lm-publisher-flex--spacer ${className}`}>
            <ButtonLink size={size} to="/login" variant="secondary">Connexion</ButtonLink>
            <ButtonLink size={size} to="/signup" variant="secondary">Inscription</ButtonLink>
        </div>;
    }
    return (
        <span className={`auth-actions lm-publisher-center-flex lm-publisher-flex--spacer ${className}`}>
            <span className="auth-actions__user">
                Bonjour <span className="accent">{user.username}</span>, 
            </span>
            <Button size={size} onClick={() => logout()} variant="secondary" isLoading={isPendingLogout}>Logout</Button>
        </span>
    );
}