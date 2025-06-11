import { createFileRoute, redirect } from '@tanstack/react-router'
import ImageFormatterPage from '../../../pages/images/formatter'

export const Route = createFileRoute('/images/formatter/')({
  component: RouteComponent,
  beforeLoad: async ({context}) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
            redirect: location.href,
        }
      })
    }
    // You can add any pre-load logic here if needed
  },
})

function RouteComponent() {
  return <ImageFormatterPage />
}
