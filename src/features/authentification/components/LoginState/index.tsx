import { useWhoAmI } from "../../api/use-who-am-i";

export const LoginState = () => {
    const { user } = useWhoAmI();
    if (!user) {
        return <span>Non connecté</span>
    }
    return (
         <span>
            Connecté en tant que : <span className="accent">{user.username}</span>
        </span>
    );
}