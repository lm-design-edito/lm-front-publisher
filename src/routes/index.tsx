import { createFileRoute } from '@tanstack/react-router'
import Index from '../pages/public/index.tsx'

export const Route = createFileRoute('/')({
  component: Index,
})
