import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';

type useDebugRefreshTokenReturn = Awaited<
  ReturnType<typeof api.queries.auth.debugRefreshToken>
>;

export function useDebugRefreshToken(clbs?: {
  onSuccess?: (data: useDebugRefreshTokenReturn) => void;
  onError?: (error: unknown) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => api.queries.auth.debugRefreshToken(),
    onSuccess: data => {
      clbs?.onSuccess?.(data);
      client.invalidateQueries({
        queryKey: ['debug-refresh-token'],
      });
    },
    onError: data => {
      clbs?.onError?.(data);
      client.invalidateQueries({
        queryKey: ['debug-refresh-token'],
      });
    },
  });
}
