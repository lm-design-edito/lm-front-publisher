import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import './style.css'
import FormInput from "../../../../components/forms/FormInput";

const signupFormSchema = zod.object({
    username: zod.string().min(5, "Le nom d'utilisateur doit faire au moins 5 caractères"),
    password: zod.string().min(3, "Le mot de passe doit faire au moins 3 caractères"),
    email: zod.string().email("L'adresse e-mail doit être valide"),
})

type SignupFormSchemaValues = zod.infer<typeof signupFormSchema>

export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupFormSchemaValues>({ resolver: zodResolver(signupFormSchema) });
    
    const onSubmit = () => {
        console.log('on submit')
    }

    console.log({errors})

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    error={errors.username}
                    label="Nom d'utilisateur"
                    labelProps={{ htmlFor: "username" }}
                    inputProps={{
                        type: "text",
                        id: "username",
                        autoComplete: "username",
                        ...register("username"),
                        required: true
                    }}
                />
                <FormInput
                    error={errors.email}
                    label="Adresse e-mail"
                    labelProps={{ htmlFor: "email" }}
                    inputProps={{
                        type: "email",
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
                        autoComplete: "off",
                        ...register("password"),
                        required: true
                    }} 
                />
                <button type="submit">S'inscrire</button>

            </form>
        </div>
    )
}