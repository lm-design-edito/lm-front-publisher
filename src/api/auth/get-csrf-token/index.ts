import getAPIUrl from '../../get-api-url';
import API_ROUTES from '../../routes';

let csrfToken: string | null = null;

export const getCsrfToken = async () => {
  if (csrfToken !== null) return csrfToken;
  csrfToken = await fetchCsrfToken();
  return csrfToken;
};

export const fetchCsrfToken = async () => {
  const request = getAPIUrl(API_ROUTES.AUTH_GET_CSRF_TOKEN);
  const options: RequestInit = {
    credentials: 'include',
  };
  const response = await fetch(request, options);
  const data = await response.json();
  if (data.payload) {
    return data.payload.token;
  }
  return null;
};
