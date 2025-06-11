import { type FC } from "react";
type Props = {
  children?: React.ReactNode
}

/* @todo ? encore besoin de ça ou pas ?*/
const Auth: FC<Props> = (props) => {
    // Access the client

    return <>{props.children}</>   
}

export default Auth;
