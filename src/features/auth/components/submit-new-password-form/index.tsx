import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { Form } from '@common/components/forms';
import { useToastContext } from '@common/hooks/useToastContext';
import { useSubmitNewPassword } from '@features/auth/services/use-submit-new-password';
import { useNavigate } from '@tanstack/react-router';
import { appRoutes } from '@src/appRoutes';

const submitNewPasswordFormSchema = zod.object({
  email: zod.string().email("L'adresse e-mail doit être valide"),
  token: zod.string().min(6, 'Le code de réinitialisation est requis'),
  password: zod
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

type SubmitNewPasswordFormValues = zod.infer<
  typeof submitNewPasswordFormSchema
>;

export const SubmitNewPasswordForm = ({
  email: defaultEmail,
}: {
  email: string;
}) => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SubmitNewPasswordFormValues>({
    resolver: zodResolver(submitNewPasswordFormSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const { mutate: submitNewPassword } = useSubmitNewPassword({
    onSuccess: () => {
      showToast({
        type: 'success',
        message: 'Nouveau mot de passe enregistré avec succès',
      });
      navigate({ to: appRoutes.login });
    },
    onError: err => {
      showToast({
        type: 'error',
        message: err.message,
      });
    },
  });

  const onSubmit = async (data: SubmitNewPasswordFormValues) => {
    submitNewPassword({
      email: data.email,
      token: data.token,
      password: data.password,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        error={errors.email}
        label="Adresse e-mail"
        labelProps={{ htmlFor: 'email' }}
        isValid={isValid}
        inputProps={{
          type: 'text',
          id: 'email',
          ...register('email'),
          disabled: true,
          required: true,
        }}
      />
      <Form.Input
        error={errors.token}
        label="Code de vérification"
        labelProps={{ htmlFor: 'token' }}
        isValid={isValid}
        inputProps={{
          type: 'text',
          id: 'token',
          autoComplete: 'one-time-code',
          ...register('token'),
          required: true,
        }}
      />
      <Form.Input
        error={errors.password}
        isValid={isValid}
        label="Mot de passe"
        labelProps={{ htmlFor: 'password' }}
        inputProps={{
          type: 'password',
          id: 'password',
          ...register('password'),
          required: true,
        }}
      />
      <Form.Footer>
        <Form.Submit isLoading={isSubmitting} disabled={isSubmitting}>
          Valider le nouveau mot de passe
        </Form.Submit>
      </Form.Footer>
    </Form>
  );
};
