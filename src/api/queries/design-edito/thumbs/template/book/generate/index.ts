import { api } from '@api/index';
import type { Publisher } from '@api/publisher';
import type { APIResponseErrorType, APIResponseSuccessType } from '@api/query';
import type { ImageResponseSuccessPayload } from '@api/query/responses';
import API_ROUTES from '@api/routes';
import { createFormDataForAPI } from '@utils/create-form-data-for-api';
import { Logger } from '@utils/logger';

export type TemplateBookGenerateRequestParams =
  Publisher.BodyOf<'DESIGN_EDITO_THUMBS_TEMPLATE_BOOK_GENERATE'>;

export type TemplateBookGenerateResponseSuccessType =
  APIResponseSuccessType<ImageResponseSuccessPayload>;

export type TemplateBookGenerateResponse =
  | TemplateBookGenerateResponseSuccessType
  | APIResponseErrorType;

const supportedProperties = ['fileIds'];
export const templateBookGenerate = async (
  params: TemplateBookGenerateRequestParams,
): Promise<TemplateBookGenerateResponse> => {
  const formData = createFormDataForAPI(params, supportedProperties, {});
  Logger.log('FORMDATA-templateBookGenerate params', formData);
  Logger.log('params-templateBookGenerate params', params);
  return api.query(API_ROUTES.DESIGN_EDITO_THUMB_TEMPLATE_GENERATE_BOOK, {
    body: JSON.stringify(params),
    // _removeContentType: true,
  });
};
