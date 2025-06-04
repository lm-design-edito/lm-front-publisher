import { postLogin } from "./login";
import { postLogout } from "./logout";
import { postSignup } from "./signup";

export const auth = {
    post: {
        login: postLogin,
        logout: postLogout,
        signup: postSignup
    }
}