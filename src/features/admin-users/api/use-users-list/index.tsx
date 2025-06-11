import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";

export function useUsersList(params?: Parameters<typeof api.queries.admin.usersList>[0]) {
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["users-list"],
        queryFn: () => {
            return api.queries.admin.usersList(params);
        },
    });

    const returnProps = {
        isLoading,
        list: []
    }

    if (isLoading) {
        return returnProps;
    }

    if (isSuccess && data.success) {
        return {
            ...returnProps,
            list: data?.payload.list || [],
        };
    } else {
        return returnProps;
    }
}
