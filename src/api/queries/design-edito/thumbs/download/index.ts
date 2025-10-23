import { api } from '@api/index';
import type { APIResponseErrorType, APIResponseSuccessType } from '@api/query';
import type { ImageResponseSuccessPayload } from '@api/query/responses';
import API_ROUTES from '@api/routes';

export type ThumbDownloadSuccessPayload = ImageResponseSuccessPayload & {
  id: string;
};

export type ThumbDownloadResponseSuccessType =
  APIResponseSuccessType<ThumbDownloadSuccessPayload>;

export type ThumbDownloadResponse =
  | ThumbDownloadResponseSuccessType
  | APIResponseErrorType;

export const thumbDownload = async (params: {
  id: string;
}): Promise<ThumbDownloadResponse> => {
  const response = await api.query(
    API_ROUTES.DESIGN_EDITO_THUMB_DOWNLOAD_TEMP,
    {
      _queryParams: {
        id: params.id,
      },
    },
  );

  if (response.success && response.payload) {
    return {
      ...response,
      payload: {
        ...response.payload,
        id: params.id,
      } as ThumbDownloadSuccessPayload,
    };
  }
  /* @ts-expect-error: known response here */
  return response;
};
