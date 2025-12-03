import type { Publisher } from '@api/publisher';
import { api } from '../../../..';
import API_ROUTES from '../../../../routes';

type AdminUsersListRequestParams = Publisher.BodyOf<'ADMIN_USERS_GET'>;
type AdminUsersSuccessPayload =
  Publisher.SuccessResponseOf<'ADMIN_USERS_GET'>['payload'][];

export const adminUsersGet = async (params: AdminUsersListRequestParams) =>
  api.query<AdminUsersSuccessPayload>(API_ROUTES.ADMIN_USERS_GET, {
    method: 'POST',
    body: JSON.stringify(params),
  });
