import { saveToken } from '@api/auth/token';

export const responseMiddleware = (response: Response) => {
  if (!response.headers) {
    return;
  }
  if (response.headers.get('X-Access-Token')) {
    saveToken(response.headers.get('X-Access-Token') || '');
  }
};
