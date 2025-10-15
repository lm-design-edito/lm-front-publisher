import type { APIResponseErrorType, APIResponseSuccessType } from '../response';

type ClbHandlers<T> = {
  onSuccess: (data: T) => APIResponseSuccessType<T>;
  onError: (error: Response) => Promise<APIResponseErrorType>;
};
