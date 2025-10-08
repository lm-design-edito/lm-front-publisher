import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';
import type { APIResponseErrorType } from '../../../../api/query';
import formatAPIError from '../../../../api/format-api-error';

type UseVerifyEmailParams = Parameters<typeof api.queries.auth.verifyEmail>[0];
type UseVerifyEmailReturn = Awaited<
  ReturnType<typeof api.queries.auth.verifyEmail>
>;

const DEFAULT_ERROR_MESSAGE =
  'Une erreur a eu lieu lors de la validation de votre email. Veuillez réessayer plus tard.';

const HANDLED_ERRORS = {
  'user-email-verification-token-does-not-exist':
    "Aucun compte correspondant à l'email n'a été trouvé",
  'user-email-verification-process-failed': DEFAULT_ERROR_MESSAGE,
  'user-email-already-verified': 'Cet email a déjà été vérifié.',
  'invalid-credentials': 'Identifiants invalides. Veuillez réessayer.',
};

export function useVerifyEmail(clbs?: {
  onSuccess?: (data: UseVerifyEmailReturn) => void;
  onError?: (error: { name: string; message: string; code: number }) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: UseVerifyEmailParams) =>
      api.queries.auth.verifyEmail(params),
    onSuccess: (data: UseVerifyEmailReturn) => {
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });

      if (!data.success) {
        clbs?.onError?.(
          formatAPIError(
            data as APIResponseErrorType,
            HANDLED_ERRORS,
            DEFAULT_ERROR_MESSAGE,
          ),
        );
        return;
      }
      clbs?.onSuccess?.(data);
    },
    onError: err => {
      clbs?.onError?.(
        formatAPIError(err, HANDLED_ERRORS, DEFAULT_ERROR_MESSAGE),
      );
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
  });
}
