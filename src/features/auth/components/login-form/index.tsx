import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Form } from '@common/components/forms';
import { useLogin } from '../../services/use-login';
import { useContext } from 'react';
import { ToastContext } from '@common/providers/toast/toastContext';
import { appRoutes } from '@src/appRoutes';
import { useNavigate } from '@tanstack/react-router';

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

  const { showToast, hideToast } = useContext(ToastContext);

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      hideToast('login-form');
      showToast({
        type: 'success',
        id: 'login-success',
        message: 'Vous êtes connecté',
      });
      navigate({ to: appRoutes.index });
    },
    onError: error => {
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
          autoComplete: 'current-password',
          ...register('password'),
          required: true,
        }}
      />
      <Form.Footer>
        <Form.Submit isLoading={isPending}>Se connecter</Form.Submit>
      </Form.Footer>
    </Form>
  );
};
