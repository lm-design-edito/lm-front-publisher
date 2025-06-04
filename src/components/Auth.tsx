import { useMutation } from "@tanstack/react-query";
import { type FC } from "react";
import { api } from "../api";
import { useGetMyUser } from "../api/hooks/useGetMyUser";
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
      <button onClick={() => postLoginMutation.mutate({ email: 'fabas@lemonde.fr', password: 'admin' })}>login to MAIN_ADMIN</button>
      <button onClick={() => postRequestEmailVerificationTokenMutation.mutate({ _id: '684046820cafdeda64c90716', verified: true  })}>verify user lea</button>
      {props.children}
    </>
}

export default Auth;