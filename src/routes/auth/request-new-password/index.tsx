import { Headline } from '@common/components/headline';
import { RequestNewPasswordForm } from '@features/auth/components/request-new-password-form';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import * as zod from 'zod';

export const Route = createFileRoute('/auth/request-new-password/')({
  component: RequestNewPasswordPage,
  validateSearch: zod.object({
    forgotPassword: zod.boolean().optional(),
  }),
});

function RequestNewPasswordPage() {
  const { forgotPassword } = useSearch({
    strict: false,
  });
  return (
    <>
      <Headline
        title={
          forgotPassword
            ? 'Mot de passe oublié ?'
            : 'Réinitialiser le mot de passe'
        }
        description="Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe."
      />
      <RequestNewPasswordForm />
    </>
  );
}
