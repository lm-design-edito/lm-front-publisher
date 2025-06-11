import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginPage from '../pages/public/login'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && context.auth.isAuthenticated) {
      throw redirect({
        to: '/admin',
        search: {
          redirect: location.href,
        },
      })
    }
    // This is a placeholder for any pre-load logic you might want to implement
    // For example, you could check user permissions or load initial data
    console.log('Loading login route...')
  }
})

function RouteComponent() {
  return <LoginPage />
}
