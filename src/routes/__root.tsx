import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Auth from '../components/Auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '../contexts/theme/useTheme/ThemeProvider'
import ThemeSwitcher from '../components/ui/ThemeSwitcher'

// Create a client
const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Auth>
          <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{' '}
            <Link to="/login" className="[&.active]:font-bold">
              Login
            </Link>
            <Link to="/signup" className="[&.active]:font-bold">
              Signup
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </div>
          <ThemeSwitcher />
          <hr />
          <h1>Bienvenue sur <span className="accent">LM Publisher</span>.</h1>
          <p>Ici ça publish fort</p>
          <p>Pour toute question, besoin de support : <span className="accent">fabas@lemonde.fr</span></p>
          <Outlet />
          <TanStackRouterDevtools />

        </Auth>
      </ThemeProvider>
    </QueryClientProvider>
  ),
})