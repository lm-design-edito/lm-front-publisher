import getAPIUrl from '../get-api-url';
import { getCsrfToken } from '../auth/get-csrf-token';
import { refreshJWT } from '../auth/refresh-jwt';
import { isAuthError } from '../auth/is-auth-error';
import { HANDLED_AUTH_ERRORS } from '../auth/handled-auth-errors';
import { getToken } from '../auth/token';
import {
  handleResponse,
  type APIREsponseErrorType,
  type APIREsponseSuccessType,
} from './responses';

export type QueryOptions = {
  _ignoreToken?: boolean;
  _removeContentType?: boolean;
} & RequestInit;

export const handleQuery = async (request: string, options?: QueryOptions) => {
  const response = await authQuery(request, options);
  console.log('handleQuery', response);
  return handleResponse(response);
};

/* @todo: c'est la fonction magique à qui on fait une requête et si erreur en cas de 403 hop on fait le nécessaire puis on retry */
export const query = async <T>(
  request: string,
  options?: QueryOptions,
): Promise<APIREsponseErrorType | APIREsponseSuccessType<T>> => {
  const handledResponse = await handleQuery(request, options);
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
