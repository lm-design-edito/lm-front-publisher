export type APIReponseType = {
  httpStatus: number;
  payload: unknown;
  success: boolean;
  type: string;
};

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

export function createSuccessResponse<SuccessResponsePayload>(
  response: Response,
  payload: SuccessResponsePayload,
): APIResponseSuccessType<SuccessResponsePayload> {
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
