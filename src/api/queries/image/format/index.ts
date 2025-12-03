import type {
  APIResponseErrorType,
  APIResponseSuccessType,
  ImageResponseSuccessPayload,
} from '@api/query/responses';
import { api } from '../../..';
import API_ROUTES from '../../../routes';
import { createFormDataForAPI } from '@utils/create-form-data-for-api';
import type { Publisher } from '@api/publisher';

const supportedProperties = [
  'width',
  'height',
  'type',
  'fit',
  'quality',
  'compressionLevel',
  'file',
];

export type ImageFormatRequestParams = Publisher.BodyOf<'IMAGE_FORMAT'>;

export type ImageFormatResponseSuccessType =
  APIResponseSuccessType<ImageResponseSuccessPayload>;

export type ImageFormatResponse =
  | ImageFormatResponseSuccessType
  | APIResponseErrorType;

export const imageFormat = async (
  params: ImageFormatRequestParams,
): Promise<ImageFormatResponse> => {
  const formData = createFormDataForAPI(params, supportedProperties, {
    file: 'image',
  });
  return await api.query<ImageResponseSuccessPayload>(API_ROUTES.IMAGE_FORMAT, {
    method: 'POST',
    body: formData,
    _removeContentType: true,
  });
};
