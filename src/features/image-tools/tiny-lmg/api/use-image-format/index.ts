import { useMutation } from '@tanstack/react-query';
import { api } from '../../../../../api';
import type { FormattedAPIErrorType } from '@api/helpers';

type UseImageFormatParams = Parameters<typeof api.queries.image.format>[0];
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
      api.queries.image.format(params),
    onSuccess: data => {
      if (data.success) {
        clbs?.onSuccess?.(data.payload);
        return;
      }
      clbs?.onError?.(api.helpers.formatAPIError(data));
    },
    onError: err => {
      clbs?.onError?.(api.helpers.formatAPIError(err));
    },
  });
}
