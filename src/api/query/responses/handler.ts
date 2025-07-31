import {
  responseImageHandler,
  responseJsonHandler,
  responseTextHandler,
  type ImageResponseSuccessPayload,
} from './custom-handlers';
import { responseMiddleware } from './middleware';
import { createSuccessResponse } from './response';
import { createErrorResponse } from './response';

export const handleResponse = async (response: Response) => {
  responseMiddleware(response);

  if (response.headers && response.headers.get('content-type')) {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return responseJsonHandler(response, {
        onSuccess: data => createSuccessResponse(response, data),
        onError: error => createErrorResponse(error),
      });
    }
    if (contentType.includes('image')) {
      return responseImageHandler(response, {
        onSuccess: (data: ImageResponseSuccessPayload) =>
          createSuccessResponse(response, data),
        onError: error => createErrorResponse(error),
      });
    }
    if (
      contentType.includes('text/html') ||
      contentType.includes('text/plain')
    ) {
      responseTextHandler(response, {
        onSuccess: data => createSuccessResponse(response, data),
        onError: error => createErrorResponse(error),
      });
    }
  }
  if (response.ok) {
    return createSuccessResponse(response, {});
  }
  return createErrorResponse(response);
};
