import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Header } from '@common/components/header';
import { Footer } from '@common/components/footer';
import { useUnverifiedToaster } from '@features/auth/hooks/useUnverifiedToaster';
import type { QueryClient } from '@tanstack/react-query';
import type { ToastContextType } from '@common/providers/toast/toastContext';
import { useSyncHeightToCSSVar } from '@common/hooks/useSyncHeightToCSSVar';
import { useRef } from 'react';
import { ToastProvider } from '@common/providers/toast/toastProvider';
import { Breadcrumb } from '@common/components/breadcrumb';
import { useSystemStatusChangeToaster } from '@features/system/hooks/useSystemStatusChangeToaster';

// Create a client

export type RouterContext = {
  auth: {
    isAuthenticated: boolean;
    isVerified: boolean;
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

const RootContent = () => {
  useSystemStatusChangeToaster();
  useUnverifiedToaster();

  const $appBbreadcrumbRef = useRef<HTMLDivElement>(null);
  useSyncHeightToCSSVar({
    target: $appBbreadcrumbRef,
    cssPropertyName: '--lm-publisher-breadcrumb-height',
  });

  return (
    <>
      <Header />
      <div className="app-breadcrumb" ref={$appBbreadcrumbRef}>
        <Breadcrumb />
      </div>
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export const RootPage = () => {
  return (
    <ToastProvider>
      <RootContent />
    </ToastProvider>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <RootPage />,
});
