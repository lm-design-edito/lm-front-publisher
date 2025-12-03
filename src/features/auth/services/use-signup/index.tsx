import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../api';

type UseSignupParams = Parameters<typeof api.queries.auth.signup>[0];
type UseSignupReturn = Awaited<ReturnType<typeof api.queries.auth.signup>>;

const DEFAULT_ERROR_MESSAGE =
  "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.";

export function useSignup(clbs?: {
  onSuccess?: (data: UseSignupReturn) => void;
  onError?: (error: { name: string; message: string; code: number }) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (params: UseSignupParams) => api.queries.auth.signup(params),
    onSuccess: (data: UseSignupReturn) => {
      client.invalidateQueries({
        queryKey: ['who-am-i'],
      });

      if (!data.success) {
        clbs?.onError?.(
          api.helpers.formatAPIError(
            data,
            {
              'username-already-taken':
                "Le nom d'utilisateur que vous avez choisi est déjà pris",
              'email-address-already-taken':
                "L'email que vous avez choisi correspond déjà un autre compte utilisateur",
            },
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
