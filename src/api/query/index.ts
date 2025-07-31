import getAPIUrl from '../get-api-url';
import { getCsrfToken } from '../auth/get-csrf-token';
import { refreshJWT } from '../auth/refresh-jwt';
import { isAuthError } from '../auth/is-auth-error';
import { HANDLED_AUTH_ERRORS } from '../auth/handled-auth-errors';
import { getToken, saveToken } from '../auth/token';

export type APIReponseType = {
  httpStatus: number;
  payload: unknown;
  success: boolean;
  type: string;
};

export type APIREsponseErrorType = {
  httpStatus: number;
  error: {
    code: string;
    message: string;
  };
  success: false;
  type: 'error';
};

export type APIREsponseSuccessType = {
  httpStatus: number;
  success: true;
  type: 'success';
  payload: unknown;
};

export type QueryOptions = {
  _ignoreToken?: boolean;
  _removeContentType?: boolean;
} & RequestInit;

const responseMiddleware = (response: Response) => {
  if (!response.headers) {
    return;
  }
  if (response.headers.get('X-Access-Token')) {
    saveToken(response.headers.get('X-Access-Token') || '');
  }
};

const createSuccessResponse = (
  response: Response,
  payload: unknown = {},
): APIREsponseSuccessType => {
  return {
    httpStatus: response.status,
    success: true,
    type: 'success',
    payload,
  };
};

const createErrorResponse = (response: Response): APIREsponseErrorType => {
  return {
    httpStatus: response.status,
    success: false,
    type: 'error',
    error: {
      code: response.statusText,
      message: response.statusText,
    },
  };
};

const responseJsonMiddleware = async (response: Response) => {
  responseMiddleware(response);
  return await response.json();
};

const responseTextMiddleware = async (response: Response) => {
  if (response.ok) {
    return createSuccessResponse(response, await response.text());
  }

  return createErrorResponse(response);
};

/** Return formatted response */
const handleResponse = async (response: Response) => {
  if (response.headers && response.headers.get('content-type')) {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return responseJsonMiddleware(response);
    }
    if (
      contentType.includes('text/html') ||
      contentType.includes('text/plain')
    ) {
      responseTextMiddleware(response);
    }
  }
  if (response.ok) {
    return createSuccessResponse(response, {});
  }
  return createErrorResponse(response);
};

export const handleQuery = async (request: string, options?: QueryOptions) => {
  const response = await authQuery(request, options);
  return handleResponse(response);
};

/* @todo: c'est la fonction magique à qui on fait une requête et si erreur en cas de 403 hop on fait le nécessaire puis on retry */
export const query = async (request: string, options?: QueryOptions) => {
  const jsonResponse = await handleQuery(request, options);
  const authError = isAuthError(jsonResponse);

  if (!authError) {
    return jsonResponse;
  }

  await authQueryOnError(authError);
  return await handleQuery(request, options);
};

/* Ca c'est la fonction qui ajoute les auths */
export const authQuery = async (request: string, options?: QueryOptions) => {
  const authedOptions = await getAuthedOptions(options);
  return fetch(getAPIUrl(request), authedOptions);
};

/* C'est assez explicite je pense comme nom de fonction héhé */
export const getAuthedOptions = async (options?: QueryOptions) => {
  const { _ignoreToken, _removeContentType, ...fetchOptions } = options || {};
  const csrfToken = await getCsrfToken();
  const token = getToken();


  return (options = {
    ...(fetchOptions ? fetchOptions : {}),
    headers: {
      ...(_removeContentType ? {} : { 'Content-Type': 'application/json' }),
      ...(fetchOptions && fetchOptions.headers ? fetchOptions.headers : {}),
      'X-CSRF-Token': csrfToken || '',
      ...(token && !_ignoreToken ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  });
};

/* @todo */
export const authQueryOnError = async (errorCode: string) => {
  const authedOptions = await getAuthedOptions();
  switch (errorCode) {
    case HANDLED_AUTH_ERRORS.CSRF_TOKEN:
      console.log('CSRF token error, fetching new token');
      return getCsrfToken();
    case HANDLED_AUTH_ERRORS.JWT_TOKEN:
      console.log('JWT token error, refreshing token');
      alert(
        'AUTH.ERROR JWT: Votre session a expiré, nous allons vous reconnecter.',
      );
      return refreshJWT({
        ...authedOptions,
        method: 'POST',
      });
    default:
      return new Promise(resolve => {
        return resolve(true);
      });
  }
};
