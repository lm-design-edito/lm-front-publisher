import { HANDLED_AUTH_ERRORS_VALUES } from "../handled-auth-errors";

const INTERCEPT_AUTHENTIFICATION_CODES_STATUS = [403, 401];

/* @todo: un enfer à lire cette fonction */
export const isAuthError = (jsonResponse: object) => {
    if ( 'httpStatus' in jsonResponse && 
        jsonResponse.httpStatus &&
        typeof jsonResponse.httpStatus === 'number' &&
        INTERCEPT_AUTHENTIFICATION_CODES_STATUS.includes(jsonResponse.httpStatus) && 
        'error' in jsonResponse && 
        typeof jsonResponse.error === 'object' &&
        jsonResponse.error &&
        'code' in jsonResponse.error &&
        typeof jsonResponse.error.code === 'string' &&
        HANDLED_AUTH_ERRORS_VALUES.includes(jsonResponse.error.code)
    ) {
        return jsonResponse.error.code;
    }
    return false
}