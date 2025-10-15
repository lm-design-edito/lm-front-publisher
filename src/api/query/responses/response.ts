export type APIResponseErrorType = {
  httpStatus: number;
  error: {
    code: string;
    message: string;
  };
  success: false;
  type: 'error';
};

export type APIResponseSuccessType<T> = {
  httpStatus: number;
  success: true;
  type: 'success';
  payload: T;
};

export type APIResponse<T> = APIResponseErrorType | APIResponseSuccessType<T>;

export function createSuccessResponse<T>(
  response: Response,
  payload: T,
): APIResponseSuccessType<T> {
  return {
    httpStatus: response.status,
    success: true,
    type: 'success',
    payload,
  };
}

export const createDefaultResponse = (
  response: Response,
): APIResponseErrorType => ({
  httpStatus: 200,
  success: false,
  type: 'error',
  error: {
    code: response.statusText,
    message: response.statusText,
  },
});

export const createErrorResponse = async (
  response: Response,
): Promise<APIResponseErrorType> => {
  if (
    response.headers &&
    response.headers.get('content-type') &&
    response.headers.get('content-type')?.includes('json')
  ) {
    try {
      const data = await response.json();
      if (
        data &&
        typeof data === 'object' &&
        'error' in data &&
        data.error &&
        typeof data.error === 'object' &&
        'code' in data.error
      ) {
        return {
          httpStatus: response.status,
          success: false,
          type: 'error',
          error: {
            code: data.error.code,
            message: data.error.message || response.statusText,
          },
        };
      }
    } catch {
      return createDefaultResponse(response);
    }
  }
  return createDefaultResponse(response);
};
