import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';
import type { APIResponseErrorType } from '../../../../api/query';
import formatAPIError from '../../../../api/format-api-error';

type UseLoginParams = Parameters<typeof api.queries.auth.login>[0];
type UseLoginReturn = Awaited<ReturnType<typeof api.queries.auth.login>>;

const DEFAULT_ERROR_MESSAGE =
  'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.';

export function useLogin(clbs?: {
  onSuccess?: (data: UseLoginReturn) => void;
  onError?: (error: { name: string; message: string; code: number }) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: UseLoginParams) => api.queries.auth.login(params),
    onSuccess: (data: UseLoginReturn) => {
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });

      if (!data.success) {
        clbs?.onError?.(
          formatAPIError(
            data as APIResponseErrorType,
            {
              'invalid-credentials':
                'Identifiants invalides. Veuillez réessayer.',
            },
            DEFAULT_ERROR_MESSAGE,
          ),
        );
        return;
      }
      clbs?.onSuccess?.(data);
    },
    onError: err => {
      clbs?.onError?.(formatAPIError(err));
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
  });
}
