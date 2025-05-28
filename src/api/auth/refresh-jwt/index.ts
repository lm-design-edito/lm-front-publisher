import getAPIUrl from "../../get-api-url";
import API_ROUTES from "../../routes"

export const refreshJWT = async (authedOptions: RequestInit) => {
    return fetch(getAPIUrl(API_ROUTES.AUTH_REFRESH_JWT_TOKEN), authedOptions);
}