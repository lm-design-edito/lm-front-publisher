import { useMutation } from '@tanstack/react-query';
import { api } from '@api/index';
import type { ImageTransformResponseSuccessType } from '@api/queries/image/transform';
import { useSystemStatusCheck } from '@features/system/services/use-system-status-check';

export type TemplateBookImageGenerate = {
  outputFileName?: string;
  template: 'BOOK';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any; // [WIP] TODO
} & Parameters<typeof api.queries.designEdito.templateBookGenerate>[0];

type UseImageGenerateParams = TemplateBookImageGenerate | undefined;

export function useImageGenerate(clbs?: {
  onWaitingForServer?: () => void;
  onSuccess?: (data: ImageTransformResponseSuccessType) => void;
  onError?: (error: ReturnType<typeof api.helpers.formatAPIError>) => void;
}) {
  const { isHealthy: isSystemHealthy, isLoading: isLoadingSystemStatusCheck } =
    useSystemStatusCheck();

  return useMutation({
    mutationFn: async (params: UseImageGenerateParams) => {
      if (!params || !('template' in params)) {
        throw new Error('Paramètres invalides ou manquants');
      }

      if (isLoadingSystemStatusCheck || !isSystemHealthy) {
        clbs?.onWaitingForServer?.();
        throw new Error('Server might be down, waiting for it to be healthy');
      }

      switch (params.template) {
        case 'BOOK':
          return api.queries.designEdito.templateBookGenerate(params);
        default:
          throw new Error(`Template non supporté: ${params.template}`);
      }
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
