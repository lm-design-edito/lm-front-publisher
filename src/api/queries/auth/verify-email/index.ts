import { api } from '../../..';
import type {
  APIResponseErrorType,
  APIResponseSuccessType,
} from '../../../query';
import API_ROUTES from '../../../routes';

type VerifyEmailParams = { email: string; token: string };

type LoginUser = {
  _id: string;
  username: string;
  badges: string[];
  role: string;
  email: string;
  verified: boolean;
};

type VerifyEmailResponse =
  | APIResponseSuccessType<LoginUser>
  | APIResponseErrorType;

export const verifyEmail = async (
  params: VerifyEmailParams,
): Promise<VerifyEmailResponse> =>
  api.query(API_ROUTES.AUTH_POST_VERIFY_EMAIL, {
    method: 'POST',
    body: JSON.stringify(params),
    _ignoreToken: true,
  });
