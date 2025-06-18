import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";
import { useMemo } from "react";

export function useIsServiceAllowed(servicesNames: string[]) {
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ["whoAmI"],
        queryFn: () => {
        return api.queries.auth.whoAmI();
        },
    });

    const allowedServices = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (isSuccess && data.success) {
            const user = data.payload;
            return servicesNames.filter(serviceName => user.isAdmin || user.badges.includes(serviceName));
        } else {
            return [];
        }
    }, [isSuccess, isLoading, data, servicesNames]);

    return allowedServices;
}
