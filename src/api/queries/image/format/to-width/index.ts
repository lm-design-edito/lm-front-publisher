import { api } from '@api/index';
import API_ROUTES from '@api/routes';

export type ImageFormatToWith = {
  width: number;
  file: File;
};

export const imageFormatToWidth = async (params: ImageFormatToWith) => {
  const formData = new FormData();

  for (const key in params) {
    const _key = key as keyof typeof params;
    if (Object.prototype.hasOwnProperty.call(params, _key)) {
      const value = params[_key];
      if (typeof value === 'object' && value instanceof File) {
        formData.append('file', params.file);
      }
      formData.append(key, value.toString());
    }
  }

  return api.query(API_ROUTES.IMAGESFORMAT_TO_WIDTH, {
    method: 'POST',
    body: formData,
  });
};
