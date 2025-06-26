import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignupForm } from '@features/authentification/components/signup-form';
import { Headline } from '../../common-components/headline-';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <Headline title="Inscription" />
      <SignupForm />
    </div>
  );
};

export const Route = createFileRoute('/signup/')({
  component: SignupPage,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && context.auth.isAuthenticated) {
      throw redirect({
        to: '/admin',
        search: {
          redirect: location.href,
        },
      });
    }
    // This is a placeholder for any pre-load logic you might want to implement
    // For example, you could check user permissions or load initial data
    console.log('Loading signup route...');
  },
});
