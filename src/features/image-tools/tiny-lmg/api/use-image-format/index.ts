import { useMutation } from '@tanstack/react-query';
import { api } from '../../../../../api';
import formatAPIError, {
  type FormattedAPIErrorType,
} from '../../../../../api/format-api-error';

type UseImageFormatParams = Parameters<typeof api.queries.images.format>[0];
type UseImageFormatReturn = Awaited<
  ReturnType<typeof api.queries.images.format>
>;

export function useImageFormat(clbs?: {
  onSuccess?: (data: UseImageFormatReturn) => void;
  onError?: (error: FormattedAPIErrorType) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageFormatParams) =>
      api.queries.images.format(params),
    onSuccess: data => {
      if (!data.success) {
        clbs?.onError?.(formatAPIError(data));
      }
      clbs?.onSuccess?.(data);
    },
    onError: err => {
      clbs?.onError?.(formatAPIError(err));
    },
  });
}
