import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";

export function useIsServiceAllowed(serviceName: string) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["whoAmI"],
    queryFn: () => {
      return api.queries.auth.whoAmI();
    },
  });

  if (isLoading) {
    return false;
  }

  if (isSuccess && data.success) {
    const user = data.payload;
    return user.isAdmin || user.badges.includes(serviceName);
  } else {
    return false;
  }
}
