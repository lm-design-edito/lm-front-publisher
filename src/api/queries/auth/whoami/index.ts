import { api } from '../../..';
import type {
  APIResponseErrorType,
  APIResponseSuccessType,
} from '../../../query';
import API_ROUTES from '../../../routes';

export type WhoAmIParams = unknown;

type WhoAmIUser = {
  badges: string[];
  _id: string;
  verified: boolean;
  role: string;
  status: string;
  email: string;
  username: string;
  isEmailVerified: boolean;
  isAdmin: boolean;
};

export type WhoAmIResponse =
  | APIResponseSuccessType<WhoAmIUser>
  | APIResponseErrorType;

export const whoAmI = async (params?: WhoAmIParams): Promise<WhoAmIResponse> =>
  api.query(API_ROUTES.AUTH_POST_WHOAMI, {
    method: 'POST',
    body: JSON.stringify(params),
});
