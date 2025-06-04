import { postLogin } from "./login";
import { postLogout, postLogoutEverywhere } from "./logout";
import { postRequestEmailVerificationToken } from "./request-email-verification-token";
import { postSignup } from "./signup";
import { postWhoAmI } from "./whoami";

export const auth = {
    post: {
        whoAmI: postWhoAmI,
        login: postLogin,
        logout: postLogout,
        logoutEverywhere: postLogoutEverywhere,
        signup: postSignup,
        requestEmailVerificationToken: postRequestEmailVerificationToken
    }
}