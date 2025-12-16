import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '@features/theme';
import { Header } from '@common/components/header';
import { Footer } from '@common/components/footer';
import { useUnverifiedToaster } from '@features/auth/hooks/useUnverifiedToaster';
// import { ToastProvider } from '@common/providers/toast/toastProvider';
import type { QueryClient } from '@tanstack/react-query';
import type { ToastContextType } from '@common/providers/toast/toastContext';
import { Breadcrumb } from '@common/components/breadcrumb';
import { useSyncHeightToCSSVar } from '@common/hooks/useSyncHeightToCSSVar';
import { useRef } from 'react';

// Create a client

export type RouterContext = {
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  queryClient?: QueryClient;
  toaster?: ToastContextType;
};

type BreadcrumbContext = {
  params: Record<string, string>;
  pathname: string;
  routeId: string;
};

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    title?: string;
    getBreadcrumb?: (match: BreadcrumbContext) => string | React.ReactNode;
  }
}

export const RootPage = () => {
  useUnverifiedToaster();
  const $appBbreadcrumbRef = useRef<HTMLDivElement>(null);
  useSyncHeightToCSSVar({
    target: $appBbreadcrumbRef,
    cssPropertyName: '--lm-publisher-breadcrumb-height',
  });

  return (
    <ThemeProvider>
      <Header />
      <div className="app-breadcrumb" ref={$appBbreadcrumbRef}>
        <Breadcrumb />
      </div>
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <RootPage />,
});
