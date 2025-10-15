import { useMutation } from '@tanstack/react-query';
import { api } from '@api/index';
import type { ImageTransformResponseSuccessType } from '@api/queries/image/transform';

type UseImageTransformParams = Parameters<
  typeof api.queries.image.transform
>[0];

export function useImageTransform(clbs?: {
  onSuccess?: (data: ImageTransformResponseSuccessType) => void;
  onError?: (error: ReturnType<typeof api.helpers.formatAPIError>) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageTransformParams) =>
      api.queries.image.transform(params),
    onSuccess: data => {
      if (!data.success) {
        clbs?.onError?.(api.helpers.formatAPIError(data));
        console.log('data success is false', data);
      }
      clbs?.onSuccess?.(data as ImageTransformResponseSuccessType);
    },
    onError: err => {
      clbs?.onError?.(api.helpers.formatAPIError(err));
    },
  });
}
