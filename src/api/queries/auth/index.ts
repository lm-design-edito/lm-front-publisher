import { login } from "./login";
import { logout, logoutEverywhere } from "./logout";
import { requestEmailVerificationToken } from "./request-email-verification-token";
import { signup } from "./signup";
import { whoAmI } from "./whoami";

export const auth = {
    whoAmI,
    login,
    logout,
    logoutEverywhere,
    signup,
    requestEmailVerificationToken,
}