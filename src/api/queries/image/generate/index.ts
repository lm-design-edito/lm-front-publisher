import type {
  APIREsponseErrorType,
  APIREsponseSuccessType,
} from '@api/query';
import { createFormDataForAPI, Logger } from '@utils/index';

type ImageGenerate = {
  operations: object; // Replace with actual type if known
  file: File;
};

type ImageGenerateResponse =
  | APIREsponseErrorType
  | (APIREsponseSuccessType & {
    payload: {
      message: string;
      images: {
        url: string;
        width: number;
        height: number;
        alt: string;
      }[];
    };
  });

const supportedProperties = [
  'file',
  'operations'
];

export const imageGenerate = async (
  params: ImageGenerate,
): Promise<ImageGenerateResponse> => {
  Logger.log('api.queries.imageGenerate.params', params);
  const formData = createFormDataForAPI(params, supportedProperties, {
    file: 'image',
  });
  Logger.log('api.queries.imageGenerate.formData', formData);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.4; // Simulate success or failure randomly

      if (!isSuccess) {
        return reject({
          success: false,
          error: {
            message: 'Failed to generate image',
            code: 'IMAGE_GENERATION_ERROR',
          },
        });
      }
      return resolve({
        httpStatus: 200,
        success: true,
        type: 'success',
        payload: {
          message: 'Images generated successfully',
          images: [
            {
              url: 'https://example.com/generated-image.png', // Replace with actual URL
              width: 800,
              height: 600,
              alt: 'Generated Image',
            },
          ],
        },
      });
    }, 1000); // Simulate a delay for the API call
  });

};
