import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeProvider } from '@features/ui/theme';
import { Header } from '../components/Header';
import { DebugDevBar } from '@features/debug';

// Create a client

type RouterContext = {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
  };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <ThemeProvider>
        <DebugDevBar />
        <Header />
        <div className="app-content">
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </ThemeProvider>
    </>
  ),
});
