import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, type FC } from "react";
import { api } from "../api";
type Props = {
  children?: React.ReactNode
}

const Auth: FC<Props> = (props) => {
    // Access the client
    const postLoginMutation = useMutation({
      mutationFn: api.queries.auth.post.login
    });
    const postRequestEmailVerificationTokenMutation = useMutation({
      mutationFn: api.queries.admin.post.usersUpdate
    });

    // Queries
    return <>
      <button onClick={() => postLoginMutation.mutate({ email: 'fabas@lemonde.fr', password: 'admin' })}>login</button>
      <button onClick={() => postRequestEmailVerificationTokenMutation.mutate({ _id: '684046820cafdeda64c90716', verified: true  })}>validate user</button>
      {props.children}
    </>
}

export default Auth;