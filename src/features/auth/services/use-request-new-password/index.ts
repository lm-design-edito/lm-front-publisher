import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';
import type { APIResponseErrorType } from '../../../../api/query';

type UseRequestNewPasswordParams = Parameters<
  typeof api.queries.auth.requestNewPassword
>[0];
type UseRequestNewPassordReturn = Awaited<
  ReturnType<typeof api.queries.auth.requestNewPassword>
>;
type UseRequestNewPasswordSuccessReturn = {
  email: string;
};

const DEFAULT_ERROR_MESSAGE =
  "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard.";

const HANDLED_ERROR_MESSAGES = {
  'user-email-does-not-exist':
    "L'adresse e-mail n'existe pas. Veuillez vérifier et réessayer.",
};

export function useRequestNewPassword(clbs?: {
  onSuccess?: (data: UseRequestNewPasswordSuccessReturn) => void;
  onError?: (error: { name: string; message: string; code: number }) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: UseRequestNewPasswordParams) =>
      api.queries.auth.requestNewPassword(params),
    onSuccess: (data: UseRequestNewPassordReturn, variables) => {
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
      clbs?.onSuccess?.({
        email: variables.email,
      });
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
