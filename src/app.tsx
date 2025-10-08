import { RouterProvider } from '@tanstack/react-router';
import { useWhoAmI } from './features/auth/api/use-who-am-i';
import { router } from './router';
import { Headline } from '@common-components/headline';

export default function App() {
  const { isAuthenticated, isLoading } = useWhoAmI();
  if (isLoading) {
    return (
      <div className="app-content">
        <Headline
          title="LM Publisher"
          description="The app is loading, you should wait. If it loads undefinetly, please contact us."
        />
      </div>
    ); /* You can replace this with a loading spinner or skeleton screen */
  }
  return (
    <RouterProvider
      router={router}
      context={{ auth: { isAuthenticated, isLoading } }}
    />
  );
}
