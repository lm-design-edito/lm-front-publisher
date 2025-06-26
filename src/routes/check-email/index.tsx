import { createFileRoute } from '@tanstack/react-router';

const CheckEmailPage = () => {
  return (
    <>
      <h2>Validez votre inscription</h2>
      <p>Valider l'inscription grâce au lien reçu par mail</p>
    </>
  );
};

export const Route = createFileRoute('/check-email/')({
  component: CheckEmailPage,
});
