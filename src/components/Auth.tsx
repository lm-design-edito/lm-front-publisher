import { useMutation } from "@tanstack/react-query";
import { type FC } from "react";
import { api } from "../api";
type Props = {
  children?: React.ReactNode
}

const Auth: FC<Props> = (props) => {
    // Access the client
    const loginMutation = useMutation({
      mutationFn: api.queries.auth.login
    });
    const requestEmailVerificationTokenMutation = useMutation({
      mutationFn: api.queries.admin.usersUpdate
    });
    // Queries
    return <>
      <button onClick={() => loginMutation.mutate({ email: 'fabas@lemonde.fr', password: 'admin' })}>login to MAIN_ADMIN</button>
      <button onClick={() => requestEmailVerificationTokenMutation.mutate({ _id: '684046820cafdeda64c90716', verified: true  })}>verify user lea</button>
      {props.children}
    </>
}

export default Auth;