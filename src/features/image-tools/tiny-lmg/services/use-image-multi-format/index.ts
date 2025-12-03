import { useMutation } from '@tanstack/react-query';
import { api } from '@api/index';
import type {
  APIResponseErrorType,
  ImageResponseSuccessPayload,
} from '@api/query/responses';
import type { FormattedAPIErrorType } from '@api/helpers';

type UseImageMultiFormatParams = Omit<
  Parameters<typeof api.queries.image.format>[0],
  'type'
> & {
  formats: string[];
};

export type FormattedImage = ImageResponseSuccessPayload & {
  source: {
    name: string;
  };
  date: Date;
  dimensions: {
    width: number;
    height: number;
  };
  quality: number;
};

export function useImageMultiFormat(clbs?: {
  onSuccess?: (data: { list: FormattedImage[] }) => void;
  onError?: (error: FormattedAPIErrorType) => void;
}) {
  return useMutation({
    mutationFn: (params: UseImageMultiFormatParams) => {
      return Promise.all(
        params.formats.map(format =>
          api.queries.image.format({ ...params, type: format }),
        ),
      );
    },
    onSuccess: (allData, variables) => {
      const hasOneSuccess = allData.some(data => data.success);
      if (!hasOneSuccess) {
        clbs?.onError?.(
          api.helpers.formatAPIError(allData[0] as APIResponseErrorType),
        ); // Assuming all responses have the same structure
        return;
      }
      const successfulData = allData.filter(data => data.success);
      clbs?.onSuccess?.({
        list: successfulData.map(data => {
          return {
            source: {
              name: variables.file.name,
            },
            ...data.payload,
            date: new Date(),
            dimensions: {
              width: variables.width,
              height: variables.height,
            },
            quality: variables.quality,
          };
        }),
      }); // Return the first successful payload
    },
    onError: err => {
      clbs?.onError?.(api.helpers.formatAPIError(err));
    },
  });
}
