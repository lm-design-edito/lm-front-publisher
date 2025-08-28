import type { ImageResponseSuccessPayload } from '@api/query/responses';
import { api } from '../../..';
import API_ROUTES from '../../../routes';
import { createFormDataForAPI } from '@utils/create-form-data-for-api';
import { Logger } from '@utils/index';

type ImageTransform = {
  image: File;
  operations: [
    {
      name: 'blur',
      sigma: number;
    },
  ];
};

const supportedProperties = ['image', 'operations'];
export const imageTransform = async (params: ImageTransform) => {
  Logger.log('api.queries.image.transform.params', { params });
  const formData = createFormDataForAPI(params, supportedProperties, {
    file: 'image',
  });
  Logger.log('api.queries.image.transform.formData', formData);

  return await api.query<ImageResponseSuccessPayload>(
    API_ROUTES.IMAGE_TRANSFORM,
    {
      method: 'POST',
      body: formData,
      _removeContentType: true,
    },
  );
};
