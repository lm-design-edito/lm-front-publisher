import { useMutation } from "@tanstack/react-query";
import { type FC } from "react";
import { api } from "../api";
import { useLogin } from "../api/composables/auth/use-login";
import { useLogout } from "../api/composables/auth/use-logout";
type Props = {
  children?: React.ReactNode
}

const Auth: FC<Props> = (props) => {
    // Access the client

    const { mutate: login } = useLogin();
    const { mutate: logout } = useLogout();
    const requestEmailVerificationTokenMutation = useMutation({
      mutationFn: api.queries.admin.usersUpdate
    });
    // Queries
    return <>
      <button onClick={() => login({ email: 'fabas@lemonde.fr', password: 'admin' })}>login to MAIN_ADMIN</button>
      <button onClick={() => logout()}>Log out</button>
      <button onClick={() => requestEmailVerificationTokenMutation.mutate({ _id: '684046820cafdeda64c90716', verified: true  })}>verify user lea</button>
      {props.children}
    </>
}

export default Auth;