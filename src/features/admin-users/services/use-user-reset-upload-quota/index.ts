import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';
import type { FormattedAPIErrorType } from '@api/helpers';

type useUserGetParams = {
  _id: string;
};

type UseUserResetUploadQuotaReturn = Awaited<
  ReturnType<typeof api.queries.admin.users.resetUploadQuota>
>;

export function useUserResetUploadQuota(clbs: {
  onSuccess?: (data: UseUserResetUploadQuotaReturn) => void;
  onError?: (error: FormattedAPIErrorType) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: useUserGetParams) =>
      api.queries.admin.users.resetUploadQuota({
        userId: params._id,
      }),
    onSuccess: (data, variables) => {
      client.invalidateQueries({
        queryKey: ['user-get-upload-quota', variables._id],
      });
      if (data.success) {
        clbs?.onSuccess?.(data);
      } else {
        clbs?.onError?.(api.helpers.formatAPIError(data));
      }
    },
    onError: err => {
      clbs?.onError?.(api.helpers.formatAPIError(err));
    },
  });
}
