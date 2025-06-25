import { authQuery } from "../../../query";
import API_ROUTES from "../../../routes";

/* Should only be used for debug purposes as it uses no middleware */
export const refreshToken = async () =>  {
    const response = await authQuery(API_ROUTES.AUTH_REFRESH_JWT_TOKEN, {
        method: 'POST',
        body: JSON.stringify({}),
    });
    console.log('refreshToken response', response);
}