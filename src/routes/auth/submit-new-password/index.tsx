import { Headline } from '@common/components/headline';
import { SubmitNewPasswordForm } from '@features/auth';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import * as zod from 'zod';

const submitNewPasswordSchema = zod.object({
  email: zod.string().email("L'adresse e-mail doit être valide"),
});

export const Route = createFileRoute('/auth/submit-new-password/')({
  component: SubmitNewPasswordPage,
  validateSearch: search => submitNewPasswordSchema.parse(search),
});

function SubmitNewPasswordPage() {
  const { email } = useSearch({
    strict: false,
  });

  return (
    <>
      <Headline
        title="Réinitialiser le mot de passe"
        description="Veuillez entrer votre code reçu par email ainsi que votre nouveau mot de passe. "
      />
      <SubmitNewPasswordForm email={email || ''} />
    </>
  );
}
