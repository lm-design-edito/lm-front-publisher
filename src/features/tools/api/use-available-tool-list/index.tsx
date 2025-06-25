import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";
import { useMemo } from "react";

export function useAvailableToolList(toolBadges: string[]) {
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
            return toolBadges.filter(badge => user.isAdmin || user.badges.includes(badge) || badge === 'all');
        } else {
            return [];
        }
    }, [isSuccess, isLoading, data, toolBadges]);

    return availableTools;
}
