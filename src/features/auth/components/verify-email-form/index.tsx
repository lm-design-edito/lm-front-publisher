import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Form } from '@common/components/forms';
import { useWhoAmI } from '../../services/use-who-am-i';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useVerifyEmail } from '@features/auth/services/use-verify-email';
import { appRoutes } from '@src/appRoutes';
import { useToastContext } from '@common/hooks/useToastContext';
import { Logger } from '@utils/logger';

const loginFormSchema = zod.object({
  email: zod.string().email("L'adresse e-mail doit être valide"),
  token: zod.string().min(3, 'Le code saisi faire au moins 3 caractères'),
});

type LoginFormSchemaValues = zod.infer<typeof loginFormSchema>;

export const VerifyEmailForm = () => {
  const { email } = useSearch({
    strict: false,
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormSchemaValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: email,
    },
  });

  const { user } = useWhoAmI();
  const { showToast } = useToastContext();
  const { mutate: verifyEmail, isPending } = useVerifyEmail({
    onSuccess: () => {
      showToast({
        type: 'success',
        message: (
          <>
            Votre e-mail a bien été vérifié.{' '}
            <Link to={appRoutes.login}>Se connecter</Link>
          </>
        ),
      });
      navigate({
        to: appRoutes.index,
      });
    },
    onError: error => {
      showToast({
        type: 'error',
        message: error.message,
      });
    },
  });

  const onSubmit = (values: LoginFormSchemaValues) => {
    verifyEmail({
      email: values.email,
      token: values.token,
    });
  };

  useEffect(() => {
    if (user?.verified) {
      Logger.redirection(
        'VerifyEmailForm:',
        'User is already verified, redirecting to /',
      );
      navigate({ to: appRoutes.index });
    }
  }, [user?.verified, navigate]);

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
          autoComplete: 'email',
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
          ...register('token'),
          required: true,
        }}
      />
      <Form.Footer>
        <Form.Submit isLoading={isPending}>Valider</Form.Submit>
      </Form.Footer>
    </Form>
  );
};
