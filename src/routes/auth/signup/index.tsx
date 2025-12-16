import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '@features/auth/components/signup-form';
import { Headline } from '@common/components/headline';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <Headline title="Inscription" />
      <SignupForm />
    </div>
  );
};

export const Route = createFileRoute('/auth/signup/')({
  staticData: {
    getBreadcrumb: () => 'Inscription',
    title: 'Inscription',
  },
  component: SignupPage,
});
