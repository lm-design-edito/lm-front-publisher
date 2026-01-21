import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { LoginForm } from '@features/auth';
import { Headline } from '@common/components/headline';
import { Logger } from '@utils/logger';
import { Divider } from '@common/components/divider';
import { Text } from '@common/components/text';
import { appRoutes } from '@src/appRoutes';

const LoginPage = () => {
  return (
    <>
      <Headline title="Connexion" />
      <LoginForm />
      <Divider />
      <Text size="sm">
        Vous avez oublié votre mot de passe ?{' '}
        <Link
          to={appRoutes.requestNewPassword}
          search={{ forgotPassword: true }}
        >
          Rendez-vous sur la page de ré-initialisation de mot de passe
        </Link>
      </Text>
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
  },
});
