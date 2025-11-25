import { api } from '@api/index';
import type { Publisher } from '@api/publisher';
import type { APIResponseErrorType, APIResponseSuccessType } from '@api/query';
import type { ImageResponseSuccessPayload } from '@api/query/responses';
import API_ROUTES from '@api/routes';

export type TemplateBookGenerateRequestParams =
  Publisher.BodyOf<'DESIGN_EDITO_THUMBS_TEMPLATE_BOOK_GENERATE'>;

export type TemplateBookGenerateResponseSuccessType =
  APIResponseSuccessType<ImageResponseSuccessPayload>;

export type TemplateBookGenerateResponse =
  | TemplateBookGenerateResponseSuccessType
  | APIResponseErrorType;

export const templateBookGenerate = async (
  params: TemplateBookGenerateRequestParams,
): Promise<TemplateBookGenerateResponse> => {
  return api.query(API_ROUTES.DESIGN_EDITO_THUMB_TEMPLATE_GENERATE_BOOK, {
    body: JSON.stringify(params),
    // _removeContentType: true,
  });
};
