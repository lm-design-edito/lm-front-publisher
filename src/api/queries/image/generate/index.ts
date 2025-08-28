// import { api } from "../../..";
// import API_ROUTES from "../../../routes";

import type {
  APIREsponseErrorType,
  APIREsponseSuccessType,
} from '../../../query';

type ImageGenerate = {
  properties: object; // Replace with actual type if known
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

export const imageGenerate = async (
  params: ImageGenerate,
): Promise<ImageGenerateResponse> => {
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

  console.log('API.QUERIES.IMAGE.GENERATE, with params', params);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // Simulate success or failure randomly

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

  /* @todo */
  // return api.query(API_ROUTES.IMAGEGENERATE, {
  //     method: 'POST',
  //     body: formData
  // });
};
