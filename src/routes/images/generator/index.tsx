import { createFileRoute, redirect } from '@tanstack/react-router'
import { ImageGeneratorForm } from '../../../features/images/components/ImageGeneratorForm'

const ImageGeneratorPage = () => {
  return (
    <>
      <ImageGeneratorForm />
    </>
  )
}

export const Route = createFileRoute('/images/generator/')({
  component: ImageGeneratorPage,
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