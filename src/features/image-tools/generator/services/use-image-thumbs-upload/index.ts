import { useMutation } from '@tanstack/react-query';
import { api } from '@api/index';
import type { ThumbsUploadResponseSuccessType } from '@api/queries';
import { Logger } from '@utils/logger';
import { useSystemStatusCheck } from '@features/system/services/use-system-status-check';

type UseImageThumbUpload = Parameters<
  typeof api.queries.designEdito.thumbsUpload
>[0];

export function useImageThumbsUpload(clbs?: {
  onWaitingForServer?: () => void;
  onSuccess?: (data: ThumbsUploadResponseSuccessType) => void;
  onError?: (error: ReturnType<typeof api.helpers.formatAPIError>) => void;
}) {
  const { isLoading: isLoadingSystemStatusCheck, isHealthy: isSystemHealthy } =
    useSystemStatusCheck();

  return useMutation({
    retry: 3,
    mutationFn: async (params: UseImageThumbUpload) => {
      /* Attendre que le serveur soit opérationnel */
      if (isLoadingSystemStatusCheck || !isSystemHealthy) {
        Logger.error(
          'image-tools.api.useImageThumbsUpload',
          'Waiting for server',
        );
        clbs?.onWaitingForServer?.();
        throw new Error('Server might be down, waiting for it to be healthy');
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
