import type { APIREsponseErrorType, APIREsponseSuccessType } from '../response';

type ClbHandlers<T> = {
  onSuccess: (data: T) => APIREsponseSuccessType<T>;
  onError: (error: Response) => APIREsponseErrorType;
};
