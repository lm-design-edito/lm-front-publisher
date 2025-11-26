import * as Publisher from '@design-edito/publisher';
import { api } from '../../..';
import API_ROUTES from '../../../routes';

export type SystemStatusCheckSuccessPayload =
  Publisher.SuccessResponseOf<'SYSTEM_STATUS_CHECK_GET'>['payload'];

export const systemStatusCheck = async () =>
  api.query<SystemStatusCheckSuccessPayload>(API_ROUTES.SYSTEM_STATUS_CHECK, {
    method: 'GET',
  });
