import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from '@features/auth';
import { Headline } from '@common/components/headline';
import { Logger } from '@utils/logger';

const LoginPage = () => {
  return (
    <>
      <Headline title="Connexion" />
      <LoginForm />
    </>
  );
};

export const Route = createFileRoute('/auth/login/')({
  staticData: {
    getBreadcrumb: () => 'Connexion',
    title: 'Connexion',
  },
  component: LoginPage,
  beforeLoad: async ({ context }) => {
    if (context?.auth?.isLoading) {
      return;
    }
    if (context?.auth?.isAuthenticated) {
      Logger.redirection(
        'RouteMiddleware:',
        'User is already authenticated, redirecting to home page',
      );
      throw redirect({
        to: '/',
      });
    }
  }
});
