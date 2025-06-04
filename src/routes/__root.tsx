import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Auth from '../components/Auth'

export const Route = createRootRoute({
  component: () => (
    <>
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
        <hr />
        <h1>LM Publisher</h1>
        <Outlet />
        <TanStackRouterDevtools />

      </Auth>
    </>
  ),
})