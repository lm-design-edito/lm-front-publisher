import { login } from "./login";
import { logout, logoutEverywhere } from "./logout";
import { refreshToken } from "./refresh-token";
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
    debugRefreshToken: () => {
        console.warn("Debug refresh token called, this should not be used in production!");
        return refreshToken();
    }
}