import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";

export function useWhoAmI(params?: Parameters<typeof api.queries.auth.whoAmI>[0]) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["whoAmI"],
    queryFn: () => {
      return api.queries.auth.whoAmI(params);
    },
  });

  if (isLoading) {
    return {
      user: null,
      isLoading: true,
      isError: false,
    };
  }

  if (isSuccess && data.success) {
    return {
      user: data.payload,
      isLoading: false,
      isError: false,
    };
  } else {
    return {
      user: null,
      isLoading: false,
      isError: true,
    };
  }
}
