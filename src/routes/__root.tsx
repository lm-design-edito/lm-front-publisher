import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@features/theme';
import { DebugDevBar } from '@features/debug';
import { Header } from '@common/components/header';
import { useUnverifiedToaster } from '@features/auth/hooks/useUnverifiedToaster';
// import { ToastProvider } from '@common/providers/toast/toastProvider';
import type { QueryClient } from '@tanstack/react-query';
import type { ToastContextType } from '@common/providers/toast/toastContext';

// Create a client

export type RouterContext = {
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  queryClient?: QueryClient;
  toaster?: ToastContextType;
};

export const RootPage = () => {
  useUnverifiedToaster();

  return (
    <ThemeProvider>
      <DebugDevBar />
      <Header />
      <div className="app-content">
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    // <ToastProvider>
    <RootPage />
    // </ToastProvider>
  ),
});
