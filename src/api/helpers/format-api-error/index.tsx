import type { APIResponseErrorType } from '../../query/responses';

export type FormattedAPIErrorType = {
  code: number;
  name: string;
  message: string;
};

const DEFAULT_ERROR_MESSAGE =
  'Une erreur est survenue. Veuillez réessayer plus tard.';

// Type guard to check if error is APIResponseErrorType
const isAPIResponseErrorType = (
  err: APIResponseErrorType | Error,
): err is APIResponseErrorType => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'error' in err &&
    'httpStatus' in err
  );
};

export const formatAPIError = (
  error: APIResponseErrorType | Error,
  messages?: Record<string, string>,
  fallbackMessage?: string,
): FormattedAPIErrorType => {
  console.log({ error, test: isAPIResponseErrorType(error) });

  if (isAPIResponseErrorType(error)) {
    return {
      code: error.httpStatus,
      name: error.error.code || 'API Error',
      message:
        messages?.[error.error.code] ||
        fallbackMessage ||
        DEFAULT_ERROR_MESSAGE,
    };
  }

  if (error instanceof Error) {
    return {
      code: 500,
      name: error.name,
      message: fallbackMessage ? fallbackMessage : DEFAULT_ERROR_MESSAGE,
    };
  }

  // Fallback in case error is neither APIResponseErrorType nor Error
  return {
    code: 500,
    name: 'UnknownError',
    message: fallbackMessage ? fallbackMessage : DEFAULT_ERROR_MESSAGE,
  };
};
export default formatAPIError;
