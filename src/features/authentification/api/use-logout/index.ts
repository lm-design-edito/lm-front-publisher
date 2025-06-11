import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../api";

type useLogoutReturn = Awaited<ReturnType<typeof api.queries.auth.logout>>;

export function useLogout(clbs?: {
        onSuccess?: (data: useLogoutReturn) => void,
        onError?: (error: unknown) => void,
    }
) {
    const client = useQueryClient();
    return useMutation({
    mutationFn: () => api.queries.auth.logout(),
    onSuccess: (data) => {
        clbs?.onSuccess?.(data);
        console.log('logout:invalidate queries who am i');
        client.invalidateQueries({
            queryKey: ["whoAmI"],
        });
    },
    onError: (data) => {
        clbs?.onError?.(data);
        console.log('logout:invalidate queries who am i');
        client.invalidateQueries({
            queryKey: ["whoAmI"],
        });
    }
  });
}
