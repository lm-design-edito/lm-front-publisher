import getAPIUrl from "../get-api-url";
import { getCsrfToken } from "../auth/get-csrf-token"
import { refreshJWT } from "../auth/refresh-jwt";
import { isAuthError } from "../auth/is-auth-error";
import { HANDLED_AUTH_ERRORS } from "../auth/handled-auth-errors";
import { getToken, saveToken } from "../auth/token";

const responseMiddleware = (response: Response) => {
    if (!response.headers) {
        return;
    }
    if (response.headers.get('X-Access-Token')) {
        saveToken(response.headers.get('X-Access-Token') || '');
    }
}

export const handleQuery = async (request: string, options?: RequestInit) => {
    const response = await authQuery(request, options);
    responseMiddleware(response);
    return await response.json();
}

/* @todo: c'est la fonction magique à qui on fait une requête et si erreur en cas de 403 hop on fait le nécessaire puis on retry */
export const query = async (request: string, options?: RequestInit) => {
    const jsonResponse = handleQuery(request, options);
    const authError = isAuthError(jsonResponse);

    if (!authError) {
        return jsonResponse;
    }

    await authQueryOnError(authError);
    return await handleQuery(request, options);
}

/* Ca c'est la fonction qui ajoute les auths */
export const authQuery = async (request: string, options?: RequestInit) => {
    const authedOptions = await getAuthedOptions(options);
    return fetch(getAPIUrl(request), authedOptions);
}

/* C'est assez explicite je pense comme nom de fonction héhé */
export const getAuthedOptions = async (options?: RequestInit) => {
    const csrfToken = await getCsrfToken();
    const token = getToken();

    return options = {
        ...(options ? options : {}),
        headers: {
            ...(options && options.headers ? options.headers : {}),
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken || '',
            ...token ? {  'Authorization': `Bearer ${token}` } : {}
        },
        credentials: 'include'
    }
}

/* @todo */
export const authQueryOnError = async (errorCode: string) => {
    const authedOptions = await getAuthedOptions();
    switch(errorCode) {
        case HANDLED_AUTH_ERRORS.CSRF_TOKEN:
            return getCsrfToken();
        case HANDLED_AUTH_ERRORS.JWT_TOKEN:
            return refreshJWT(authedOptions);
        default: 
            return new Promise(() => {})
    }
}