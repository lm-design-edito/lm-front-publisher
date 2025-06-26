import { api } from '../../..';
import type {
  APIREsponseErrorType,
  APIREsponseSuccessType,
} from '../../../query';
import API_ROUTES from '../../../routes';

type AuthLoginParams =
  | {
      username: string;
      password: string;
    }
  | {
      email: string;
      password: string;
    };

type AuthLoginResponse = APIREsponseSuccessType | APIREsponseErrorType;

export const login = async (
  params: AuthLoginParams,
): Promise<AuthLoginResponse> =>
  api.query(API_ROUTES.AUTH_POST_LOGIN, {
    method: 'POST',
    body: JSON.stringify(params),
    ignoreToken: true,
  });
