import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../../../components/buttons/Button";
import { useLogout } from "../../api/use-logout";

type LogoutButtonProps = {
    size?: 's' | 'm' | 'l';
}

export const LogoutButton = ({ size    }: LogoutButtonProps) => {
        const navigate = useNavigate();
    const { mutate: logout, isPending: isPendingLogout } = useLogout({
        onSuccess: () => {
            console.warn("Logout successful, user logged out.");
            navigate({ to: '/' });
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });

  return (
  <Button size={size} onClick={() => logout()} variant="secondary" isLoading={isPendingLogout}>Se déconnecter</Button>
  );
}