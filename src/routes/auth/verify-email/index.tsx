import { Display } from '@common/components/display';
import { Divider } from '@common/components/divider';
import { Headline } from '@common/components/headline';
import { ReverifyEmail } from '@features/auth/components/reverify-email';
import { VerifyEmailForm } from '@features/auth/components/verify-email-form';
import { createFileRoute, redirect, useSearch } from '@tanstack/react-router';
import { Logger } from '@utils/logger';

import * as zod from 'zod';

const verifyEmailSchema = zod.object({
  email: zod.string().email("L'adresse e-mail doit être valide"),
});

const VerifyEmailPage = () => {
  const { email } = useSearch({
    strict: false,
  });
  return (
    <>
      <Headline
        title="Validez votre inscription"
        description="Valider l'inscription en vérifiant votre adresse mail grâce au code reçu par mail"
      />
      <VerifyEmailForm />

      <Display type="flex" direction="column" justify="center">
        <Divider />
        <ReverifyEmail email={email || ''} />
      </Display>
    </>
  );
};

export const Route = createFileRoute('/auth/verify-email/')({
  component: VerifyEmailPage,
  validateSearch: search => verifyEmailSchema.parse(search),
  beforeLoad: async ({ context }) => {
    if (context.auth.isLoading) {
      return;
    }
    if (context.auth.isAuthenticated && context.auth.isVerified) {
      Logger.redirection(
        'RouteMiddleware:',
        "User's email is already verified, redirecting to home page",
      );
      throw redirect({
        to: '/',
      });
    }
  },
  onError: () => {
    Logger.redirection(
      'RouteMiddleware:',
      'Invalid or missing email in query params, redirecting to home page',
    );
    throw redirect({
      to: '/',
    });
  },
});
