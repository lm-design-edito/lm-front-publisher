import {  createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Auth from '../components/Auth'
import { ThemeProvider } from '../features/UI/hooks/useTheme/ThemeProvider'
import Header from '../components/Header'
import DevBar from '../features/Dev/components/DevBar'

// Create a client


type RouterContext = {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
  }
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <>
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
    </>,
})
