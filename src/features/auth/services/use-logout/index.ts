import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';

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
        clbs?.onError?.(api.helpers.formatAPIError(data));
        return;
      }

      api.auth.removeTokenFromStorage();
      clbs?.onSuccess?.(data);
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
    onError: data => {
      clbs?.onError?.(api.helpers.formatAPIError(data));
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
  });
}
