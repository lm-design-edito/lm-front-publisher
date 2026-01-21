import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useQueryClient } from '@tanstack/react-query';
import { useWhoAmI } from '@features/auth';
import { useToastContext } from '@common/hooks/useToastContext';
import { Headline } from '@common/components/headline';
import { Loader } from '@common/components/loader';
import { Text } from '@common/components/text';

const LoadingFallback = () => {
  return (
    <div className="app-content">
      <Headline
        title="LM Publisher"
        description={
          <div>
            <Text>
              The app is loading, you should wait. If it loads indefinitely,
              please contact us.
            </Text>
            <Loader />
          </div>
        }
      />
    </div>
  );
};

export default function App() {
  const queryClient = useQueryClient();
  const toaster = useToastContext();
  const { isAuthenticated, user, isLoading } = useWhoAmI();
  if (isLoading) {
    return <LoadingFallback />;
  }
  const routerContext = {
    auth: {
      isAuthenticated,
      isLoading,
      isVerified: user ? user.verified : false,
    },
    queryClient,
    toaster: toaster,
  };
  return <RouterProvider router={router} context={routerContext} />;
}
