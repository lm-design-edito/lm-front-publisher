import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import './style.css';
import { FormInput } from '../../../../common-components/forms/form-input';
import { Form } from '../../../../common-components/forms/form';
import { FormSubmit } from '../../../../common-components/forms/form-submit';
import { useSignup } from '../../api/use-signup';
import { FormFooter } from '../../../../common-components/forms/form-footer';
import { QueriesStatus } from '../../../../common-components/queries-status';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { appRoutes } from '@src/appRoutes';

const signupFormSchema = zod.object({
  username: zod
    .string()
    .min(5, "Le nom d'utilisateur doit faire au moins 5 caractères"),
  password: zod
    .string()
    .min(3, 'Le mot de passe doit faire au moins 3 caractères'),
  email: zod.string().email("L'adresse e-mail doit être valide"),
});

type SignupFormSchemaValues = zod.infer<typeof signupFormSchema>;

export const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignupFormSchemaValues>({
    resolver: zodResolver(signupFormSchema),
  });
  const [APIError, setAPIError] = useState<string | null>(null);

  const { mutate: signup } = useSignup({
    onSuccess: data => {
      console.log('on success signup', data);
      navigate({
        to: appRoutes.verifyEmail,
        search: {
          email: getValues('email'),
        },
      });
      // Handle successful signup, e.g., redirect to login page or show success message
    },
    onError: error => {
      setAPIError(error.message); // Reset API error on new attempt
      console.error('Signup failed:', error);
      // Handle signup error, e.g., show error message
    },
  }); // Assuming you have a useSignup hook for handling signup logic

  const onSubmit = (values: SignupFormSchemaValues) => {
    setAPIError('');
    signup({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    console.log('on submit');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
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
        <FormInput
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
        <FormInput
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
        <FormFooter>
          <FormSubmit>S'inscrire</FormSubmit>
          {APIError && <QueriesStatus status="error">{APIError}</QueriesStatus>}
        </FormFooter>
      </Form>
    </div>
  );
};
