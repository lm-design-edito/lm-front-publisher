import { createFileRoute } from '@tanstack/react-router'
import CheckEmailPage from '../pages/public/check-email'

export const Route = createFileRoute('/check-email')({
  component: RouteComponent,
})

function RouteComponent() {
    return <CheckEmailPage />
}
