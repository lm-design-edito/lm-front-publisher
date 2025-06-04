import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Auth from '../components/Auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '../contexts/theme/useTheme/ThemeProvider'
import Header from '../components/Header'

// Create a client
const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Auth>
          <Header />
          <h1>Bienvenue sur <span className="accent">LM Publisher</span>.</h1>
          <p>Ici ça publish fort</p>
          <p>Pour toute question, besoin de support 24/7 : <span className="accent">fabas@lemonde.fr</span></p>
          <Outlet />
          <TanStackRouterDevtools />

        </Auth>
      </ThemeProvider>
    </QueryClientProvider>
  ),
})