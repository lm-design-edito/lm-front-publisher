import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';
import type { APIResponseErrorType } from '../../../../api/query';

type UseLoginParams = Parameters<typeof api.queries.auth.login>[0];
type UseLoginReturn = Awaited<ReturnType<typeof api.queries.auth.login>>;

const DEFAULT_ERROR_MESSAGE =
  'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.';

const HANDLED_ERROR_MESSAGES = {
  'invalid-credentials': 'Identifiants invalides. Veuillez réessayer.',
};

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
          api.helpers.formatAPIError(
            data as APIResponseErrorType,
            HANDLED_ERROR_MESSAGES,
            DEFAULT_ERROR_MESSAGE,
          ),
        );
        return;
      }
      clbs?.onSuccess?.(data);
    },
    onError: err => {
      clbs?.onError?.(
        api.helpers.formatAPIError(
          err,
          HANDLED_ERROR_MESSAGES,
          DEFAULT_ERROR_MESSAGE,
        ),
      );
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
  });
}
