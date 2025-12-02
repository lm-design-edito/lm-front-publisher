import { useMutation } from '@tanstack/react-query';
import { api } from '@api/index';
import type { ThumbsUploadResponseSuccessType } from '@api/queries';
import { Logger } from '@utils/logger';

type UseImageThumbUpload = Parameters<
  typeof api.queries.designEdito.thumbsUpload
>[0];

export function useImageThumbsUpload(clbs?: {
  onServerDown?: () => void;
  onSuccess?: (data: ThumbsUploadResponseSuccessType) => void;
  onError?: (error: ReturnType<typeof api.helpers.formatAPIError>) => void;
}) {
  return useMutation({
    retry: 3,
    mutationFn: async (params: UseImageThumbUpload) => {
      // Vérifier le statut du serveur
      const statusCheck = await api.queries.system.statusCheck();
      if (statusCheck.success && !statusCheck.payload.isHealthy) {
        Logger.log('image-tools.api.useImageThumbsUpload', 'Server is down');
        clbs?.onServerDown?.();
        throw new Error('Server is down');
      }

      // Uploader les thumbs
      Logger.log('image-tools.api.useImageThumbsUpload', 'Uploading');
      const response = await api.queries.designEdito.thumbsUpload(params);
      return response;
    },
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
