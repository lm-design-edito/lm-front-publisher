import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';
import formatAPIError from '../../../../api/format-api-error';
import type { APIREsponseErrorType } from '../../../../api/query';

type useLogoutReturn = Awaited<ReturnType<typeof api.queries.auth.logout>>;

export function useLogout(clbs?: {
  onSuccess?: (data: useLogoutReturn) => void;
  onError?: (error: unknown) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => api.queries.auth.logout(),
    onSuccess: data => {
      if (!data.success) {
        clbs?.onError?.(formatAPIError(data as APIREsponseErrorType));
        return;
      }

      api.auth.removeTokenFromStorage();
      clbs?.onSuccess?.(data);
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
    onError: data => {
      clbs?.onError?.(data);
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
  });
}
