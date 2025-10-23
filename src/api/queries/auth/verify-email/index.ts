import * as Publisher from '@design-edito/publisher';
import { api } from '../../..';

import type {
  APIResponseErrorType,
  APIResponseSuccessType,
} from '../../../query';
import API_ROUTES from '../../../routes';

type VerifyEmailParams = Publisher.BodyOf<'AUTH_VERIFY_EMAIL'>;

type VerifyEmailSuccessPayload =
  Publisher.SuccessResponseOf<'AUTH_VERIFY_EMAIL'>['payload'];

type VerifyEmailResponse =
  | APIResponseSuccessType<VerifyEmailSuccessPayload>
  | APIResponseErrorType;

export const verifyEmail = async (
  params: VerifyEmailParams,
): Promise<VerifyEmailResponse> =>
  api.query(API_ROUTES.AUTH_POST_VERIFY_EMAIL, {
    body: JSON.stringify(params),
  });
