import { api } from '../../..';
import type {
  APIResponseErrorType,
  APIResponseSuccessType,
} from '../../../query';
import API_ROUTES from '../../../routes';

type AdminUser = {
  _id: string;
  role: 'root' | 'admin' | 'user';
  status: 'active' | 'suspended' | 'banned';
  verified: boolean;
  email: string;
  username: string;
  badges: string[];
  googleId?: string;
};

type AdminUsersUpdate = {
  _id: string;
  role?: 'root' | 'admin' | 'user';
  status?: 'active' | 'suspended' | 'banned';
  verified?: boolean;
  email?: string;
  password?: string;
  googleId?: string;
  badges: string[];
};

export const adminUsersUpdate = async (params: AdminUsersUpdate) =>
  api.query(API_ROUTES.ADMIN_USERS_UPDATE, {
    method: 'POST',
    body: JSON.stringify(params),
  });

type AdminUsersListRequestParams = unknown;
type AdminUsersListResponse =
  | (APIResponseSuccessType<{ list: AdminUser[] }> & {
      payload: {
        list: AdminUser[];
      };
    })
  | APIResponseErrorType;

export const adminUsersList = async (
  params: AdminUsersListRequestParams,
): Promise<AdminUsersListResponse> =>
  api.query(API_ROUTES.ADMIN_USERS_LIST, {
    method: 'POST',
    body: JSON.stringify(params),
  });
