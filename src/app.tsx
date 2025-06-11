import { RouterProvider } from "@tanstack/react-router";
import { useWhoAmI } from "./features/Authentification/api/use-who-am-i";
import { router } from "./router";


export default function App() {
  const { isAuthenticated, isLoading } = useWhoAmI();
  if (isLoading) {
    return <div></div>; /* You can replace this with a loading spinner or skeleton screen */
  }
  return <RouterProvider router={router} context={{ auth: { isAuthenticated, isLoading } }} />
}