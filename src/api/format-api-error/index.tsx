import type { APIResponseErrorType } from '../query/responses';

export type FormattedAPIErrorType = {
  code: number;
  name: string;
  message: string;
};

const DEFAULT_ERROR_MESSAGE =
  'Une erreur est survenue. Veuillez réessayer plus tard.';
const formatAPIError = (
  error: APIResponseErrorType | Error,
  messages?: Record<string, string>,
  fallbackMessage?: string,
): FormattedAPIErrorType => {
  if (error instanceof Error) {
    return {
      code: 500,
      name: error.name,
      message: fallbackMessage ? fallbackMessage : DEFAULT_ERROR_MESSAGE,
    };
  }
  if (!error || !error.error) {
    return {
      code: 500,
      name: 'UnknownError',
      message: fallbackMessage ? fallbackMessage : DEFAULT_ERROR_MESSAGE,
    };
  }
  return {
    code: error.httpStatus,
    name: error.error.code || 'API Error',
    message:
      messages?.[error.error.code] || fallbackMessage || DEFAULT_ERROR_MESSAGE,
  };
};
export default formatAPIError;
