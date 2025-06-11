import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import FormInput from "../../../../components/forms/FormInput";

const loginFormSchema = zod.object({
    email: zod.string().email("L'adresse e-mail doit être valide"),
    password: zod.string().min(3, "Le mot de passe doit faire au moins 3 caractères"),
})



type LoginFormSchemaValues = zod.infer<typeof loginFormSchema>

export const LoginForm = () => {
     const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm<LoginFormSchemaValues>({ resolver: zodResolver(loginFormSchema) });
        
        const onSubmit = () => {
            console.log('on submit')
        }

    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                error={errors.email}
                label="Adresse e-mail"
                labelProps={{ htmlFor: "email" }}
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
            <button type="submit">Se connecter</button>
        </form>
    </div>
    )
}