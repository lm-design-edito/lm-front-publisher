import getAPIUrl from '../helpers/get-api-url';
import { getCsrfToken } from '../auth/get-csrf-token';
import { refreshJWT } from '../auth/refresh-jwt';
import { isAuthError } from '../auth/is-auth-error';
import { HANDLED_AUTH_ERRORS } from '../auth/handled-auth-errors';
import { getToken } from '../auth/token';
import {
  handleResponse,
  type APIResponse,
  type APIResponseErrorType,
  type APIResponseSuccessType,
} from './responses';
import { Logger } from '@utils/logger';

export type QueryOptions = {
  _ignoreToken?: boolean;
  _removeContentType?: boolean;
} & RequestInit;

export const handleQuery = async (request: string, options?: QueryOptions) => {
  const response = await authQuery(request, options);
  return handleResponse(response);
};

const formatQuery = (request: string, options?: QueryOptions) => {
  const splittedEndpoint = request.split(':/');
  const method =
    splittedEndpoint.length > 1
      ? splittedEndpoint[0]
      : options?.method
        ? options.method
        : 'GET';
  return {
    request: splittedEndpoint[0],
    options: {
      method: method,
      ...options,
    },
  };
};

/* c'est la fonction magique à qui on fait une requête et si erreur en cas de 403 hop on fait le nécessaire puis on retry */
export const query = async <T>(
  request: string,
  options?: QueryOptions,
): Promise<APIResponse<T>> => {
  const formattedQuery = formatQuery(request, options);
  const handledResponse = await handleQuery(
    formattedQuery.request,
    formattedQuery.options,
  );

  Logger.query('api.query', { handledResponse });

  const authError = isAuthError(handledResponse);

  if (!authError) {
    return handledResponse;
  }

  await authQueryOnError(authError);
  return await handleQuery(request, options);
};

/* Ca c'est la fonction qui ajoute les auths */
export const authQuery = async (request: string, options?: QueryOptions) => {
  const authedOptions = await getAuthedOptions(options);
  Logger.query('api.query.authQuery', { request, authedOptions });

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
      'x-csrf-token': csrfToken || '',
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
      console.warn('CSRF token error, fetching new token');
      return getCsrfToken();
    case HANDLED_AUTH_ERRORS.JWT_TOKEN:
      console.warn('JWT token error, refreshing token');
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

export {
  handleResponse,
  type APIResponseErrorType,
  type APIResponseSuccessType,
  type APIResponse,
};
