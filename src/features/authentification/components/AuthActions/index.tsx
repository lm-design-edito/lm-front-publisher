import { Link } from "@tanstack/react-router";
import { ButtonLink } from "../../../../components/buttons/ButtonLink";
import { useWhoAmI } from "../../api/use-who-am-i";

import './style.css';
import { LogoutButton } from "../LogoutButton";

type AuthActionsProps = {
    className?: string;
    size?: 's' | 'm' | 'l';
}

export const AuthActions = ({ className = '', size = 's' }: AuthActionsProps) => {
    const { user } = useWhoAmI();
    if (!user) {
        return <div className={`auth-actions lm-publisher-center-flex lm-publisher-flex-spacer ${className}`}>
            <ButtonLink size={size} to="/login" variant="secondary">Connexion</ButtonLink>
            <ButtonLink size={size} to="/signup" variant="secondary">Inscription</ButtonLink>
        </div>;
    }
    return (
        <span className={`auth-actions lm-publisher-center-flex lm-publisher-flex-spacer ${className}`}>
            <span className="auth-actions__user">
                Bonjour <Link to="/account">{user.username}</Link>, 
            </span>
            <LogoutButton size={size} />
        </span>
    );
}