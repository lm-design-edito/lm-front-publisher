import { api } from '../../..';
import type {
  APIResponseErrorType,
  APIResponseSuccessType,
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

type LoginUser = {
  _id: string;
  username: string;
  badges: string[];
  role: string;
  email: string;
  verified: boolean;
};

type AuthLoginResponse =
  | APIResponseSuccessType<LoginUser>
  | APIResponseErrorType;

export const login = async (
  params: AuthLoginParams,
): Promise<AuthLoginResponse> =>
  api.query(API_ROUTES.AUTH_POST_LOGIN, {
    method: 'POST',
    body: JSON.stringify(params),
    _ignoreToken: true,
  });
