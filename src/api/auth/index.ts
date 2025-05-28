import { getCsrfToken } from "./get-csrf-token";
import { isAuthError } from "./is-auth-error";
import { refreshJWT } from "./refresh-jwt";

export const auth = {
    getCsrfToken,
    refreshJWT,
    isAuthError
}