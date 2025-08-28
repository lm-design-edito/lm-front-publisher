import { useMutation } from '@tanstack/react-query';
import { api } from '../../../../../api';
import formatAPIError, {
  type FormattedAPIErrorType,
} from '../../../../../api/format-api-error';

type UseImageTransformParams = Parameters<
  typeof api.queries.image.transform
>[0];
type UseImageTransformReturn = Awaited<
  ReturnType<typeof api.queries.image.transform>
>;

export function useImageTransform(clbs?: {
  onSuccess?: (data: UseImageTransformReturn) => void;
  onError?: (error: FormattedAPIErrorType) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageTransformParams) =>
      api.queries.image.transform(params),
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
