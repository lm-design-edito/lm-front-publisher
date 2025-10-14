import type { PublisherApi } from '@api/publisher';
import { api } from '../../..';
import API_ROUTES from '../../../routes';

export type WhoAmIParams =
  PublisherApi.BodyOf<PublisherApi.ENDPOINT.AUTH_WHOAMI_GET>;

export type WhoAmISuccessPayload =
  PublisherApi.SuccessResponseOf<PublisherApi.ENDPOINT.AUTH_WHOAMI_GET>['payload'];

export const whoAmI = async (params?: WhoAmIParams) =>
  api.query<WhoAmISuccessPayload>(API_ROUTES.AUTH_POST_WHOAMI, {
    method: 'POST',
    body: JSON.stringify(params),
  });
