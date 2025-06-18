import ButtonLink from "../../../../components/buttons/ButtonLink";
import { useWhoAmI } from "../../api/use-who-am-i";

export const LoginState = () => {
    const { user } = useWhoAmI();
    if (!user) {
        return <ButtonLink to="/login" variant="secondary" size="s">Login</ButtonLink>
    }
    return (
         <span>
            Connecté en tant que : <span className="accent">{user.username}</span>
        </span>
    );
}