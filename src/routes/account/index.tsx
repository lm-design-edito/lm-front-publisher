import { createFileRoute } from '@tanstack/react-router';
import { MyUserProfile } from '@features/account';
import { Headline } from '@common/components/headline';
import { checkForAuthentifacted } from '@src/route-middleware';

const AccountPage = () => {
  return (
    <div className="account-page">
      <Headline title="Mon compte" />
      <MyUserProfile />
    </div>
  );
};

export const Route = createFileRoute('/account/')({
  staticData: {
    getBreadcrumb: () => 'Mon compte',
  },
  component: AccountPage,
  beforeLoad: async ({ context }) => {
    checkForAuthentifacted({ context });
  },
});
