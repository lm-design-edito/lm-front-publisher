import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Auth from '../components/Auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '../features/UI/hooks/useTheme/ThemeProvider'
import Header from '../components/Header'
import DevBar from '../features/Dev/components/DevBar'

// Create a client
const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Auth>
          <DevBar />
          <Header />
          <div className="app-content">
            <Outlet />
          </div>
          <TanStackRouterDevtools />

        </Auth>
      </ThemeProvider>
    </QueryClientProvider>
  ),
})