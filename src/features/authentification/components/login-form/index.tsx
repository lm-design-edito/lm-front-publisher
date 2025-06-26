import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { FormInput } from '../../../../common-components/forms/form-input';
import { Form } from '../../../../common-components/forms/form';
import { useLogin } from '../../api/use-login';
import { useWhoAmI } from '../../api/use-who-am-i';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { QueriesStatus } from '../../../../common-components/queries-status';
import { FormSubmit } from '../../../../common-components/forms/form-submit';
import { FormFooter } from '../../../../common-components/forms/form-footer';

const loginFormSchema = zod.object({
  email: zod.string().email("L'adresse e-mail doit être valide"),
  password: zod
    .string()
    .min(3, 'Le mot de passe doit faire au moins 3 caractères'),
});

type LoginFormSchemaValues = zod.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormSchemaValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const { isAuthenticated } = useWhoAmI();
  const [APIError, setAPIError] = useState<string | null>(null);

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      console.log('on success navigate to homepage');
    },
    onError: error => {
      setAPIError(error.message); // Reset API error on new attempt
      console.error('Login failed:', error);
    },
  });

  const onSubmit = (values: LoginFormSchemaValues) => {
    setAPIError('');
    login({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is already logged in, redirecting to /');
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

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
          required: true,
        }}
      />
      <FormInput
        error={errors.password}
        isValid={isValid}
        label="Mot de passe"
        labelProps={{ htmlFor: 'password' }}
        inputProps={{
          type: 'password',
          id: 'password',
          autoComplete: 'current-password',
          ...register('password'),
          required: true,
        }}
      />
      <FormFooter>
        <FormSubmit isLoading={isPending}>Se connecter</FormSubmit>
        {APIError && <QueriesStatus status="error">{APIError}</QueriesStatus>}
      </FormFooter>
    </Form>
  );
};
