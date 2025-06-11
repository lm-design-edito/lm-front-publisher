import { createFileRoute, redirect } from '@tanstack/react-router'
import SignupPage from '../pages/public/signup'

export const Route = createFileRoute('/signup')({
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
    console.log('Loading signup route...')
  },
})

function RouteComponent() {
  return <SignupPage />
}
