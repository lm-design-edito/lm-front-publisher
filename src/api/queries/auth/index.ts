import { postLogin } from "./login";
import { postLogout, postLogoutEverywhere } from "./logout";
import { postRequestEmailVerificationToken } from "./request-email-verification-token";
import { postSignup } from "./signup";

export const auth = {
    post: {
        login: postLogin,
        logout: postLogout,
        logoutEverywhere: postLogoutEverywhere,
        signup: postSignup,
        requestEmailVerificationToken: postRequestEmailVerificationToken
    }
}