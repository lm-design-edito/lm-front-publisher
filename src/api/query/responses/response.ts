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

export const createErrorResponse = (
  response: Response,
): APIResponseErrorType => {
  return {
    httpStatus: response.status,
    success: false,
    type: 'error',
    error: {
      code: response.statusText,
      message: response.statusText,
    },
  };
};
