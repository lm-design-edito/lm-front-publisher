import { type FC } from "react";
import { api } from "./api";
type Props = {
  children?: React.ReactNode
}
api.query('auth/login', {
  method: 'POST'
});

const Auth: FC<Props> = (props) => {
    return (
    <>
      Auth:
      {props.children}
    </>
  )
}

export default Auth;