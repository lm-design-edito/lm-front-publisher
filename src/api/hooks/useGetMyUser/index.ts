import { useMutation } from "@tanstack/react-query";
import { api } from "../..";
import type { WhoAmIResponse } from "../../queries/auth/whoami";
import { useEffect, useState } from "react";

export function useGetMyUser() {
    const [
        user,
        setUser
    ] = useState<null | WhoAmIResponse['payload']>(null);

    const { mutate: whoAmIMutate } = useMutation({
        mutationKey: ['whoAmI'],
        mutationFn: api.queries.auth.post.whoAmI,
        onSuccess(data, variables, context) {
            if (data.success && data.payload) {
                console.log('whoAmI success', {data, variables, context});
                setUser(data.payload);
            } else {
                setUser(null);
            }
        },
    });

    useEffect(() => {
        whoAmIMutate({});
    }, [whoAmIMutate])

  return { user };
}