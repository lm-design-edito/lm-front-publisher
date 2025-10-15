import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { FormInput } from '@common/components/forms/form-input';
import { Form } from '@common/components/forms/form';
import { useWhoAmI } from '../../api/use-who-am-i';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { FormSubmit } from '@common/components/forms/form-submit';
import { FormFooter } from '@common/components/forms/form-footer';
import { useVerifyEmail } from '@features/auth/api/use-verify-email';
import { appRoutes } from '@src/appRoutes';
import { useToastContext } from '@common/hooks/useToastContext';

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
      navigate({
        to: appRoutes.index,
      });
      console.log('On success navigate to login page');
    },
    onError: error => {
      console.error('Verify Email failed:', error);
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
      console.log('User is already verified, redirecting to /');
      navigate({ to: appRoutes.index });
    }
  }, [user?.verified, navigate]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
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
      <FormInput
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
      <FormFooter>
        <FormSubmit isLoading={isPending}>Se connecter</FormSubmit>
      </FormFooter>
    </Form>
  );
};
