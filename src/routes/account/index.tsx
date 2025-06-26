import { createFileRoute, redirect } from '@tanstack/react-router';
import { MyUserProfile } from '../../features/account/components/my-user-profile';
import { Headline } from '../../common-components/headline';

const AccountPage = () => {
  return (
    <div className="account-page">
      <Headline title="Mon compte" />
      <MyUserProfile />
    </div>
  );
};

export const Route = createFileRoute('/account/')({
  component: AccountPage,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && !context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
    // This is a placeholder for any pre-load logic you might want to implement
    // For example, you could check user permissions or load initial data
    console.log('Loading admin route...');
  },
});
