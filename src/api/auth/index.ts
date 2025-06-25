import { getCsrfToken } from "./get-csrf-token";
import { isAuthError } from "./is-auth-error";
import { refreshJWT } from "./refresh-jwt";
import { removeTokenFromStorage } from "./token";

export const auth = {
    getCsrfToken,
    refreshJWT,
    isAuthError,
    removeTokenFromStorage
}