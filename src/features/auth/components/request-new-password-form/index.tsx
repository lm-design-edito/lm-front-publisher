import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { Form } from '@common/components/forms';
import { useToastContext } from '@common/hooks/useToastContext';
import { useRequestNewPassword } from '@features/auth/services/use-request-new-password';
import { appRoutes } from '@src/appRoutes';
import { useNavigate } from '@tanstack/react-router';

const requestNewPasswordSchema = zod.object({
  email: zod.string().email("L'adresse e-mail doit être valide"),
});

type RequestNewPasswordFormValues = zod.infer<typeof requestNewPasswordSchema>;

export const RequestNewPasswordForm = () => {
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestNewPasswordFormValues>({
    resolver: zodResolver(requestNewPasswordSchema),
  });

  const { mutate: requestNewPassord, isPending } = useRequestNewPassword({
    onSuccess: data => {
      showToast({
        type: 'success',
        message: 'Email de réinitialisation envoyé avec succès',
      });
      navigate({
        to: appRoutes.submitNewPassword,
        search: { email: data.email },
      });
    },
    onError: err => {
      showToast({
        type: 'error',
        message: err.message,
      });
    },
  });

  const onSubmit = async (data: RequestNewPasswordFormValues) => {
    requestNewPassord({ email: data.email });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        label="Adresse email"
        labelProps={{
          htmlFor: 'email',
        }}
        inputProps={{
          id: 'email',
          type: 'email',
          placeholder: 'votre.email@example.com',
          autoComplete: 'email',
          ...register('email'),
        }}
        error={errors.email}
      />

      <Form.Footer>
        <Form.Submit isLoading={isPending} disabled={isPending}>
          Envoyer le lien de réinitialisation
        </Form.Submit>
      </Form.Footer>
    </Form>
  );
};
