import { useMutation } from '@tanstack/react-query';
import { api } from '@api/index';
import type { ThumbsUploadResponseSuccessType } from '@api/queries';

type UseImageThumbUpload = Parameters<
  typeof api.queries.designEdito.thumbsUpload
>[0];

export function useImageThumbsUpload(clbs?: {
  onSuccess?: (data: ThumbsUploadResponseSuccessType) => void;
  onError?: (error: ReturnType<typeof api.helpers.formatAPIError>) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageThumbUpload) =>
      api.queries.designEdito.thumbsUpload(params),
    onSuccess: data => {
      if (!data.success) {
        clbs?.onError?.(api.helpers.formatAPIError(data));
        return;
      }
      clbs?.onSuccess?.(data);
    },
    onError: err => {
      clbs?.onError?.(api.helpers.formatAPIError(err));
    },
  });
}
