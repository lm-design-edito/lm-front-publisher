export * from './to-width';

import type { ImageResponseSuccessPayload } from '@api/query/responses';
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
  const jsonData: Record<string, unknown> = {};

  for (const key in params) {
    const _key = key as keyof typeof params;
    if (Object.prototype.hasOwnProperty.call(params, _key)) {
      const value = params[_key];

      if (typeof value === 'object' && value instanceof File) {
        formData.append('image', params.file);
      } else {
        jsonData[_key] = value;
        formData.append(_key, value.toString());
      }
    }
  }

  formData.append('_json', JSON.stringify(jsonData));

  /* Loop through form data to log it */
  for (const [key, value] of formData.entries()) {
    console.log(`FormData: ${key} = ${value}`);
  }
  return await api.query<ImageResponseSuccessPayload>(
    API_ROUTES.IMAGES_FORMAT,
    {
      method: 'POST',
      body: formData,
      _removeContentType: true,
    },
  );
};
