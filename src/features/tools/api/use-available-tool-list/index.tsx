import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";
import { useMemo } from "react";

export function useAvailableToolList(toolsList: string[]) {
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["who-am-i"],
        queryFn: () => {
            console.log('useAvailableToolList.who-am-i');
            return api.queries.auth.whoAmI();
        },
    });

    const availableTools = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (isSuccess && data.success) {
            const user = data.payload;
            return toolsList.filter(serviceName => user.isAdmin || user.badges.includes(serviceName));
        } else {
            return [];
        }
    }, [isSuccess, isLoading, data, toolsList]);

    return availableTools;
}
