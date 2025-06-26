import { useMutation } from '@tanstack/react-query';
import { api } from '../../../../api';
import formatAPIError, {
  type FormattedAPIErrorType,
} from '../../../../api/format-api-error';

type UseImageGenerateParams = Parameters<typeof api.queries.images.generate>[0];
type UseImageGenerateReturn = Awaited<
  ReturnType<typeof api.queries.images.generate>
>;

export function useImageGenerate(clbs?: {
  onSuccess?: (data: UseImageGenerateReturn) => void;
  onError?: (error: FormattedAPIErrorType) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageGenerateParams) =>
      api.queries.images.generate(params),
    onSuccess: data => {
      if (!data.success) {
        clbs?.onError?.(formatAPIError(data));
        console.log('data success is false', data);
      }
      clbs?.onSuccess?.(data);
    },
    onError: err => {
      clbs?.onError?.(formatAPIError(err));
    },
  });
}
