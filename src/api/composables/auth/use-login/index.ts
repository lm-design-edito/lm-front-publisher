import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../..";

type UseLoginParams = Parameters<typeof api.queries.auth.login>[0]
type UseLoginReturn = Awaited<ReturnType<typeof api.queries.auth.login>>

export function useLogin(
    onSuccess?: (data: UseLoginReturn) => void,
    onError?: (error: unknown) => void,
) {
    const client = useQueryClient();
    return useMutation({
    mutationFn: (params: UseLoginParams) => api.queries.auth.login(params),
    onSuccess: (data) => {
        onSuccess?.(data);
        console.log('invalidate queries who am i');
        client.invalidateQueries({
            queryKey: ["whoAmI"],
        });
    },
    onError: (data) => {
        onError?.(data);
        console.log('invalidate queries who am i');
        client.invalidateQueries({
            queryKey: ["whoAmI"],
        });
    }
  });
}
