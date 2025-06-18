import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../api";
import type { APIREsponseErrorType } from "../../../../api/query";
import formatAPIError from "../../../../api/format-api-error";

type UseSignupParams = Parameters<typeof api.queries.auth.signup>[0]
type UseSignupReturn = Awaited<ReturnType<typeof api.queries.auth.signup>>

const DEFAULT_ERROR_MESSAGE = "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.";

export function useSignup(clbs?: {
    onSuccess?: (data: UseSignupReturn) => void,
    onError?: (error: { name: string, message: string, code: number }) => void,
}) {
    const client = useQueryClient();
    return useMutation({
    mutationFn: (params: UseSignupParams) => api.queries.auth.signup(params),
    onSuccess: (data: UseSignupReturn) => {
        client.invalidateQueries({
            queryKey: ["who-am-i"],
        });

        if (!data.success) {
            clbs?.onError?.(
                formatAPIError(data as APIREsponseErrorType, {}, DEFAULT_ERROR_MESSAGE)
            );
            return;
        }
        clbs?.onSuccess?.(data);
    },
    onError: (err) => {
        clbs?. onError?.(formatAPIError(err));
        client.invalidateQueries({
            queryKey: ["who-am-i"],
        });
    }
  });
}
