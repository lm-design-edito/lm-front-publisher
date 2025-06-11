import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import FormInput from "../../../../components/forms/FormInput";
import Form from "../../../../components/forms/Form";
import { useLogin } from "../../api/use-login";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import QueriesStatus from "../../../../components/QueriesStatus";
import FormSubmit from "../../../../components/forms/FormSubmit";
import FormFooter from "../../../../components/forms/FormFooter";
import { useWhoAmI } from "../../api/use-who-am-i";

const loginFormSchema = zod.object({
    email: zod.string().email("L'adresse e-mail doit être valide"),
    password: zod.string().min(3, "Le mot de passe doit faire au moins 3 caractères"),
})

type LoginFormSchemaValues = zod.infer<typeof loginFormSchema>

export const LoginForm = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<LoginFormSchemaValues>({ resolver: zodResolver(loginFormSchema) });

    const { isAuthenticated } = useWhoAmI();
    const [APIError, setAPIError] = useState<string | null>(null);

    const { mutate: login, isPending } = useLogin({
        onSuccess: () => {
            console.log('on success navigate to /admin');
        },
        onError: (error) => {
            setAPIError(error.message); // Reset API error on new attempt
            console.error('Login failed:', error);
        }
    });
        
    const onSubmit = (values: LoginFormSchemaValues) => {
        setAPIError("")
        login({
            email: values.email,
            password: values.password
        })
    }

    useEffect(() => {
        if (isAuthenticated) {
            console.log('User is already logged in, redirecting to /admin');
            navigate({ to: '/admin' }); // Assuming you have a redirectTo function to handle navigation
        }
    }, [isAuthenticated, navigate])

    return (
        <Form onSubmit={handleSubmit(onSubmit)} onFocus={() => setAPIError('')}>
            <FormInput
                error={errors.email}
                label="Adresse e-mail"
                labelProps={{ htmlFor: "email" }}
                isValid={isValid}
                inputProps={{
                    type: "text",
                    id: "email",
                    autoComplete: "email",
                    ...register("email"),
                    required: true
                }}
            />
            <FormInput
                error={errors.password}
                isValid={isValid}
                label="Mot de passe"
                labelProps={{ htmlFor: "password" }}
                inputProps={{
                    type: "password",
                    id: "password",
                    autoComplete: "current-password",
                    ...register("password"),
                    required: true
                }}
            />
            <FormFooter>
                <FormSubmit isLoading={isPending}>Se connecter</FormSubmit>
                {APIError && <QueriesStatus error={true}>{APIError}</QueriesStatus>}
            </FormFooter>
        </Form>
    )
}