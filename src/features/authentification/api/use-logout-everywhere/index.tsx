import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../api";
import formatAPIError from "../../../../api/format-api-error";
import type { APIREsponseErrorType } from "../../../../api/query";

type useLogoutEverywhereReturn = Awaited<ReturnType<typeof api.queries.auth.logout>>;

export function useLogoutEverywhere(clbs?: {
        onSuccess?: (data: useLogoutEverywhereReturn) => void,
        onError?: (error: unknown) => void,
    }
) {
    const client = useQueryClient();
    return useMutation({
    mutationFn: () => api.queries.auth.logoutEverywhere(),
    onSuccess: (data) => {
         if (!data.success) {
            clbs?.onError?.(
                formatAPIError(data as APIREsponseErrorType)
            );
            return;
        }

        api.auth.removeTokenFromStorage();
        clbs?.onSuccess?.(data);
        client.invalidateQueries({
            queryKey: ["who-am-i"],
        });
    },
    onError: (data) => {
        clbs?.onError?.(data);
        client.invalidateQueries({
            queryKey: ["who-am-i"],
        });
    }
  });
}
