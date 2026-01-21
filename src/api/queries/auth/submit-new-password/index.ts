import { api } from '@api/index';
import type { Publisher } from '@api/publisher';
import type { APIResponseErrorType, APIResponseSuccessType } from '@api/query';
import API_ROUTES from '@api/routes';

export type SubmitNewPasswordRequestParams =
  Publisher.BodyOf<'AUTH_SUBMIT_NEW_PASSWORD'>;

export type SubmitNewPasswordResponseSuccessType = APIResponseSuccessType<
  Publisher.ResponseOf<'AUTH_SUBMIT_NEW_PASSWORD'>
>;

export type SubmitNewPasswordResponse =
  | SubmitNewPasswordResponseSuccessType
  | APIResponseErrorType;

export const submitNewPassword = async (
  params: SubmitNewPasswordRequestParams,
): Promise<SubmitNewPasswordResponse> => {
  return api.query(API_ROUTES.AUTH_POST_SUBMIT_NEW_PASSWORD, {
    body: JSON.stringify(params),
    // _removeContentType: true,
  });
};
