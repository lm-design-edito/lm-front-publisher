export type APIReponseType = {
  httpStatus: number;
  payload: unknown;
  success: boolean;
  type: string;
};

export type APIREsponseErrorType = {
  httpStatus: number;
  error: {
    code: string;
    message: string;
  };
  success: false;
  type: 'error';
};

export type APIREsponseSuccessType<T> = {
  httpStatus: number;
  success: true;
  type: 'success';
  payload: T;
};

export function createSuccessResponse<SuccessResponsePayload>(
  response: Response,
  payload: SuccessResponsePayload,
): APIREsponseSuccessType<SuccessResponsePayload> {
  return {
    httpStatus: response.status,
    success: true,
    type: 'success',
    payload,
  };
}

export const createErrorResponse = (
  response: Response,
): APIREsponseErrorType => {
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
