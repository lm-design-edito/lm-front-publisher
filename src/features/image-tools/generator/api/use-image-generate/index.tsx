import { useMutation } from '@tanstack/react-query';
import { api } from '@api/index';
import type { ImageTransformResponseSuccessType } from '@api/queries/image/transform';

export type TemplateBookImageGenerate = {
  template: 'BOOK';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any; // [WIP] TODO
} & Parameters<typeof api.queries.designEdito.templateBookGenerate>[0];

type UseImageGenerateParams = TemplateBookImageGenerate | undefined;

export function useImageGenerate(clbs?: {
  onSuccess?: (data: ImageTransformResponseSuccessType) => void;
  onError?: (error: ReturnType<typeof api.helpers.formatAPIError>) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageGenerateParams) => {
      if (!params || !('template' in params)) {
        throw new Error('Paramètres invalides ou manquants');
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
