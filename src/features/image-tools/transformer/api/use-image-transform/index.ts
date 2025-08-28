import { useMutation } from '@tanstack/react-query';
import { api } from '../../../../../api';
import formatAPIError, {
  type FormattedAPIErrorType,
} from '../../../../../api/format-api-error';

type UseImageTransformParams = Parameters<
  typeof api.queries.image.transform
>[0];
type UseImageTransformReturn = {
  source: {
    name: string;
  };
  url: string;
  size: number;
  name: string;
  mimeType: string;
  date: Date;
};

export function useImageTransform(clbs?: {
  onSuccess?: (data: UseImageTransformReturn) => void;
  onError?: (error: FormattedAPIErrorType) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageTransformParams) =>
      api.queries.image.transform(params),
    onSuccess: (data, variables) => {
      if (!data.success) {
        clbs?.onError?.(formatAPIError(data));
        return;
      }
      clbs?.onSuccess?.({
        source: {
          name: variables.image.name,
        },
        date: new Date(),
        url: data.payload.url,
        size: data.payload.size,
        name: data.payload.name,
        mimeType: data.payload.mimeType,
      });
    },
    onError: err => {
      clbs?.onError?.(formatAPIError(err));
    },
  });
}
