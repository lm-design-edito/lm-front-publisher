import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';

type UseRequestEmailVerificationTokenParams = Parameters<
  typeof api.queries.auth.requestEmailVerificationToken
>[0];
type UseRequestEmailVerificationTokenReturn = Awaited<
  ReturnType<typeof api.queries.auth.requestEmailVerificationToken>
>;

const DEFAULT_ERROR_MESSAGE =
  "Une erreur a eu lieu lors de l'envoi de l'email. Veuillez ré-essayer plus tard";

const HANDLED_ERRORS = {
  'user-email-does-not-exist':
    "Aucun compte correspondant à l'email n'a été trouvé",
  'user-email-already-verified': 'Cet email a déjà été vérifié.',
};

export function useRequestEmailVerificationToken(clbs?: {
  onSuccess?: (data: UseRequestEmailVerificationTokenReturn) => void;
  onError?: (error: { name: string; message: string; code: number }) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: UseRequestEmailVerificationTokenParams) =>
      api.queries.auth.requestEmailVerificationToken(params),
    onSuccess: (data: UseRequestEmailVerificationTokenReturn) => {
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });

      if (!data.success) {
        clbs?.onError?.(
          api.helpers.formatAPIError(
            data,
            HANDLED_ERRORS,
            DEFAULT_ERROR_MESSAGE,
          ),
        );
        return;
      }
      clbs?.onSuccess?.(data);
    },
    onError: err => {
      clbs?.onError?.(api.helpers.formatAPIError(err));
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });
    },
  });
}
