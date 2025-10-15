import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { FormInput } from '@common/components/forms/form-input';
import { Form } from '@common/components/forms/form';
import { useLogin } from '../../api/use-login';
import { useWhoAmI } from '../../api/use-who-am-i';
import { useNavigate } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { FormSubmit } from '@common/components/forms/form-submit';
import { FormFooter } from '@common/components/forms/form-footer';
import { appRoutes } from '@src/appRoutes';
import { ToastContext } from '@common/providers/toast/toastContext';

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

  const { showToast, hideAllToasts } = useContext(ToastContext);

  const { isAuthenticated } = useWhoAmI();

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      hideAllToasts('login-form');
      showToast({
        type: 'success',
        message: 'Vous êtes connecté',
      });
    },
    onError: error => {
      hideAllToasts('login-form');
      showToast({
        groupId: 'login-form',
        type: 'error',
        message: error.message,
      });
    },
  });

  const onSubmit = (values: LoginFormSchemaValues) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is already logged in, redirecting to /');
      navigate({ to: appRoutes.index });
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
      </FormFooter>
    </Form>
  );
};
