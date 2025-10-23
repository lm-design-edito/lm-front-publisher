import * as Publisher from '@design-edito/publisher';
import { api } from '../../..';
import API_ROUTES from '../../../routes';

export type WhoAmIParams = Publisher.BodyOf<'AUTH_WHOAMI_GET'>;

export type WhoAmISuccessPayload =
  Publisher.SuccessResponseOf<'AUTH_WHOAMI_GET'>['payload'];

export const whoAmI = async (params?: WhoAmIParams) =>
  api.query<WhoAmISuccessPayload>(API_ROUTES.AUTH_POST_WHOAMI, {
    method: 'POST',
    body: JSON.stringify(params),
  });
