import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';
import type { APIResponseErrorType } from '../../../../api/query';

type UseSubmitNewPasswordParams = Parameters<
  typeof api.queries.auth.submitNewPassword
>[0];
type UseSubmitNewPassordReturn = Awaited<
  ReturnType<typeof api.queries.auth.submitNewPassword>
>;

const DEFAULT_ERROR_MESSAGE =
  "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard.";

const HANDLED_ERROR_MESSAGES = {
  'user-email-does-not-exist':
    "L'adresse e-mail n'existe pas. Veuillez vérifier et réessayer.",
  'user-password-renewal-token-does-not-exist':
    'Le code de réinitialisation du mot de passe est invalide ou a expiré. Veuillez demander un nouveau code.',
};

export function useSubmitNewPassword(clbs?: {
  onSuccess?: (data: UseSubmitNewPassordReturn) => void;
  onError?: (error: { name: string; message: string; code: number }) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: UseSubmitNewPasswordParams) =>
      api.queries.auth.submitNewPassword(params),
    onSuccess: (data: UseSubmitNewPassordReturn) => {
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
