import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@features/auth';
import { Headline } from '@common/components/headline';

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
});
