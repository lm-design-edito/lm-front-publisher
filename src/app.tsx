import { RouterProvider } from '@tanstack/react-router';
import { useWhoAmI } from '@features/auth';
import { router } from './router';
import { Headline } from '@common/components/headline';
import { Loader } from '@common/components/loader';
import { Text } from '@common/components/text';
import { useQueryClient } from '@tanstack/react-query';
import { useToastContext } from '@common/hooks/useToastContext';

export default function App() {
  const { isAuthenticated, isLoading } = useWhoAmI();
  const toastContext = useToastContext();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="app-content">
        <Headline
          title="LM Publisher"
          description={
            <div>
              <Text>
                The app is loading, you should wait. If it loads undefinetly,
                please contact us.
              </Text>
              <Loader />
            </div>
          }
        />
      </div>
    ); /* You can replace this with a loading spinner or skeleton screen */
  }
  return (
    <RouterProvider
      router={router}
      context={{
        auth: { isAuthenticated, isLoading },
        queryClient,
        toaster: toastContext,
      }}
    />
  );
}
