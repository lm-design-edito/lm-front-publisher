import { api } from '@api/index';
import type { Publisher } from '@api/publisher';
import type { APIResponseErrorType, APIResponseSuccessType } from '@api/query';
import API_ROUTES from '@api/routes';

export type RequestNewPasswordRequestParams =
  Publisher.BodyOf<'AUTH_REQUEST_NEW_PASSWORD'>;

export type RequestNewPasswordResponseSuccessType = APIResponseSuccessType<
  Publisher.ResponseOf<'AUTH_REQUEST_NEW_PASSWORD'>
>;

export type RequestNewPasswordResponse =
  | RequestNewPasswordResponseSuccessType
  | APIResponseErrorType;

export const requestNewPassword = async (
  params: RequestNewPasswordRequestParams,
): Promise<RequestNewPasswordResponse> => {
  return api.query(API_ROUTES.AUTH_POST_REQUEST_NEW_PASSWORD, {
    body: JSON.stringify(params),
    // _removeContentType: true,
  });
};
