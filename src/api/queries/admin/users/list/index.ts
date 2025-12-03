import type { Publisher } from '@api/publisher';
import { api } from '../../../..';
import API_ROUTES from '../../../../routes';

type AdminUsersListRequestParams = Publisher.BodyOf<'ADMIN_USERS_LIST'>;
type AdminUsersSuccessPayload =
  Publisher.SuccessResponseOf<'ADMIN_USERS_LIST'>['payload'][];

export const adminUsersList = async (params: AdminUsersListRequestParams) =>
  api.query<AdminUsersSuccessPayload>(API_ROUTES.ADMIN_USERS_LIST, {
    method: 'POST',
    body: JSON.stringify(params),
  });
