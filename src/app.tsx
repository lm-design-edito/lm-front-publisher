import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useQueryClient } from '@tanstack/react-query';
import { useWhoAmI } from '@features/auth';
import { useToastContext } from '@common/hooks/useToastContext';

export default function App() {
  const queryClient = useQueryClient();
  const toaster = useToastContext();
  const { isAuthenticated, isLoading } = useWhoAmI();
  const routerContext = {
    auth: {
      isAuthenticated,
      isLoading,
    },
    queryClient,
    toaster: toaster,
  };
  return <RouterProvider router={router} context={routerContext} />;
}
