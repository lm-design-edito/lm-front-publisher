import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import './style.css';
import { Form } from '@common/components/forms';
import { useSignup } from '../../services/use-signup';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { appRoutes } from '@src/appRoutes';
import { ToastContext } from '@common/providers/toast/toastContext';
import validator from 'validator';

const signupFormSchema = zod.object({
  username: zod
    .string()
    .min(5, "Le nom d'utilisateur doit faire au moins 5 caractères")
    .refine(input => validator.isSlug(input.toLowerCase()), {
      message:
        "Le nom d'utilisateur ne peut pas contenir que des caractères alphanumériques et pas d'espaces.",
    }),
  password: zod
    .string()
    .min(3, 'Le mot de passe doit faire au moins 3 caractères'),
  email: zod.string().email("L'adresse e-mail doit être valide"),
});

type SignupFormSchemaValues = zod.infer<typeof signupFormSchema>;

export const SignupForm = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignupFormSchemaValues>({
    resolver: zodResolver(signupFormSchema),
  });

  const { mutate: signup } = useSignup({
    onSuccess: () => {
      showToast({
        type: 'success',
        message: 'Inscription réussie !',
      });
      navigate({
        to: appRoutes.verifyEmail,
        search: {
          email: getValues('email'),
        },
      });
      // Handle successful signup, e.g., redirect to login page or show success message
    },
    onError: error => {
      showToast({
        type: 'error',
        message: error.message,
      });
      console.error('Signup failed:', error);
      // Handle signup error, e.g., show error message
    },
  }); // Assuming you have a useSignup hook for handling signup logic

  const onSubmit = (values: SignupFormSchemaValues) => {
    signup({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          isValid={isValid}
          error={errors.username}
          label="Nom d'utilisateur"
          labelProps={{ htmlFor: 'username' }}
          inputProps={{
            type: 'text',
            id: 'username',
            autoComplete: 'username',
            ...register('username'),
            required: true,
          }}
        />
        <Form.Input
          isValid={isValid}
          error={errors.email}
          label="Adresse e-mail"
          labelProps={{ htmlFor: 'email' }}
          inputProps={{
            type: 'email',
            id: 'email',
            autoComplete: 'email',
            ...register('email'),
            required: true,
          }}
        />
        <Form.Input
          isValid={isValid}
          error={errors.password}
          label="Mot de passe"
          labelProps={{ htmlFor: 'password' }}
          inputProps={{
            type: 'password',
            id: 'password',
            autoComplete: 'off',
            ...register('password'),
            required: true,
          }}
        />
        <Form.Footer>
          <Form.Submit>S'inscrire</Form.Submit>
        </Form.Footer>
      </Form>
    </div>
  );
};
