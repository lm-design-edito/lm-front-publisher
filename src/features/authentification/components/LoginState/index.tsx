import Button from "../../../../components/buttons/Button";
import ButtonLink from "../../../../components/buttons/ButtonLink";
import { useLogout } from "../../api/use-logout";
import { useWhoAmI } from "../../api/use-who-am-i";

import './style.css';

export const LoginState = () => {
    const { mutate: logout, isPending: isPendingLogout } = useLogout();
    const { user } = useWhoAmI();
    if (!user) {
        return <>
            <ButtonLink to="/login" variant="secondary" size="s">Connexion</ButtonLink>
            <ButtonLink to="/signup" variant="secondary" size="s">Inscription</ButtonLink>
        </>
    }
    return (
        <span className={`login-state lm-publisher-center-flex lm-publisher-flex--spacer`}>
            <span className="login-state__user">
                Bonjour <span className="accent">{user.username}</span>, 
            </span>
            <Button onClick={()=>logout()} variant="secondary" size="s" isLoading={isPendingLogout}>Logout</Button>
        </span>
    );
}