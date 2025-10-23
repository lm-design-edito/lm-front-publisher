import { api } from '@api/index';
import type { APIResponseErrorType, APIResponseSuccessType } from '@api/query';
import {
  createErrorResponse,
  createSuccessResponse,
} from '@api/query/responses';
import API_ROUTES from '@api/routes';
import { createFormDataForAPI } from '@utils/create-form-data-for-api';

// type ThumbsUploadParams = Publisher.BodyOf<'DESIGN_EDITO_THUMBS_DOWNLOAD_TEMP'>;

// export type ThumbUploadPayload =
//   Publisher.SuccessResponseOf<'DESIGN_EDITO_THUMBS_DOWNLOAD_TEMP'>['payload'];

export type ThumbUploadPayload = {
  id: string;
};

export type ThumbUploadResponseSuccessType =
  APIResponseSuccessType<ThumbUploadPayload>;

export type ThumbUploadResponse =
  | ThumbUploadResponseSuccessType
  | APIResponseErrorType;

const supportedProperties = ['image', 'options'];
export const thumbUpload = async (params: {
  image: File;
}): Promise<ThumbUploadResponse> => {
  const formData = createFormDataForAPI(params, supportedProperties, {
    file: 'image',
  });
  return api.query(API_ROUTES.DESIGN_EDITO_THUMB_UPLOAD_TEMP, {
    body: formData,
    _removeContentType: true,
  });
};

export type ThumbsUploadResponseSuccessType = APIResponseSuccessType<{
  ids: string[];
}>;

export type ThumbsUploadResponse =
  | ThumbsUploadResponseSuccessType
  | APIResponseErrorType;

export const thumbsUpload = async (
  params: {
    image: File;
  }[],
): Promise<ThumbsUploadResponse> => {
  const datas = await Promise.all(
    params.map(async param => {
      return await thumbUpload({ image: param.image });
    }),
  );
  if (!datas) {
    return createErrorResponse(
      new Response('No data returned from thumbs Upload', { status: 500 }),
    );
  }

  const successData = datas.filter(data => 'success' in data && data.success);
  if (successData.length === 0) {
    return createErrorResponse(
      new Response('No successful data returned from thumbs Upload', {
        status: 500,
      }),
    );
  }

  return createSuccessResponse(
    new Response('Thumbs uploaded successfully', { status: 200 }),
    {
      ids: successData.map(data => data.payload.id),
    },
  );
};
