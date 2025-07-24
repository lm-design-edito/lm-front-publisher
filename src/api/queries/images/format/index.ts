export * from './to-width';

import { api } from '../../..';
import API_ROUTES from '../../../routes';

type ImagesFormat = {
  width: number;
  height: number;
  format: string;
  fit: string;
  quality: number;
  compressionLevel: number;
  file: File;
};

export const imagesFormat = async (params: ImagesFormat) => {
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
  return api.query(API_ROUTES.IMAGES_FORMAT, {
    method: 'POST',
    body: formData,
  });
};
