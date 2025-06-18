import { createFileRoute, redirect } from '@tanstack/react-router'

const ImageFormatterPage = () => {
  return (
    <>
      <h2>Image Formatter</h2>
      <p>@todo</p>
      {/* <ImageFormatter /> */}
    </>
  )
}

export const Route = createFileRoute('/images/formatter/')({
  component: ImageFormatterPage,
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