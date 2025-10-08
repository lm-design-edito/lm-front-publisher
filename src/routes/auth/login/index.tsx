import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from '@features/auth';
import { Headline } from '@common-components/headline';

const LoginPage = () => {
  return (
    <>
      <Headline title="Connexion" />
      <LoginForm />
    </>
  );
};

export const Route = createFileRoute('/auth/login/')({
  component: LoginPage,
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
    console.log('Loading login route...');
  },
});
