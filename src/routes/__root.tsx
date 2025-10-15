import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@features/theme';
import { DebugDevBar } from '@features/debug';
import { Header } from '@common/components/header';
import { useUnverifiedToaster } from '@features/auth/hooks/useUnverifiedToaster';
import { ToastProvider } from '@common/providers/toast/toastProvider';

// Create a client

type RouterContext = {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
  };
};

export const RootPage = () => {
  useUnverifiedToaster();

  return (
    <ThemeProvider>
      <DebugDevBar />
      <Header />
      {/* <UnverifiedUserBanner /> */}
      <div className="app-content">
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <ToastProvider>
      <RootPage />,
    </ToastProvider>
  ),
});
