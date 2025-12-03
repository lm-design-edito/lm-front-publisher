import type { Publisher } from '@api/publisher';
import { api } from '../../../..';
import API_ROUTES from '../../../../routes';

type AdminUsersResetUploadQuotaRequestParams =
  Publisher.BodyOf<'ADMIN_USERS_RESET_UPLOAD_QUOTA'>;
type AdminUsersSuccessPayload =
  Publisher.SuccessResponseOf<'ADMIN_USERS_RESET_UPLOAD_QUOTA'>['payload'];

export const adminUsersResetUploadQuota = async (
  params: AdminUsersResetUploadQuotaRequestParams,
) =>
  api.query<AdminUsersSuccessPayload>(
    API_ROUTES.ADMIN_USERS_RESET_UPLOAD_QUOTA,
    {
      method: 'POST',
      body: JSON.stringify(params),
    },
  );
