import type {
  APIResponseSuccessType,
  ImageResponseSuccessPayload,
} from '@api/query/responses';
import { api } from '../../..';
import API_ROUTES from '../../../routes';
import { createFormDataForAPI } from '@utils/create-form-data-for-api';

type ImageTransform = {
  image: File;
  operations: [
    {
      name: 'blur';
      sigma: number;
    },
  ];
};

export type ImageTransformResponseSuccessType =
  APIResponseSuccessType<ImageResponseSuccessPayload>;

const supportedProperties = ['image', 'operations'];
export const imageTransform = async (params: ImageTransform) => {
  const formData = createFormDataForAPI(params, supportedProperties, {
    file: 'image',
  });

  return await api.query<ImageResponseSuccessPayload>(
    API_ROUTES.IMAGE_TRANSFORM,
    {
      method: 'POST',
      body: formData,
      _removeContentType: true,
    },
  );
};
