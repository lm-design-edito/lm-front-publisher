import { useMutation } from '@tanstack/react-query';
import { api } from '../../../../../api';
import formatAPIError, {
  type FormattedAPIErrorType,
} from '../../../../../api/format-api-error';

type UseImageFormatParams = Parameters<typeof api.queries.images.format>[0];
type UseImageFormatSuccessReturns = {
  url: string;
  size: number;
  name: string;
  mimeType: string;
};

export function useImageFormat(clbs?: {
  onSuccess?: (data: UseImageFormatSuccessReturns) => void;
  onError?: (error: FormattedAPIErrorType) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageFormatParams) =>
      api.queries.images.format(params),
    onSuccess: data => {
      if (data.success) {
        clbs?.onSuccess?.(data.payload);
        return;
      }
      clbs?.onError?.(formatAPIError(data));
    },
    onError: err => {
      clbs?.onError?.(formatAPIError(err));
    },
  });
}
