import { createFileRoute, redirect } from '@tanstack/react-router'
import { MyUser } from '../../features/account/components/MyUser'


const AccountPage = () => {
  return (
    <div className="account-page">
      <h2>Mon compte</h2>
      <MyUser />
    </div>
  )
}

export const Route = createFileRoute('/account/')({
  component: AccountPage,
  beforeLoad: async ({context}) => {
      if (!context.auth.isLoading && !context.auth.isAuthenticated) {
          throw redirect({
              to: '/login',
              search: {
              redirect: location.href,
            },
          })
      }
      // This is a placeholder for any pre-load logic you might want to implement
      // For example, you could check user permissions or load initial data
      console.log('Loading admin route...');
    }
})