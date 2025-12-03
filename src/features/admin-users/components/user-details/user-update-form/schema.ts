import * as zod from 'zod';
import validator from 'validator';

export const userUpdateFormSchema = zod.object({
  username: zod
    .string()
    .min(5, "Le nom d'utilisateur doit faire au moins 5 caractères")
    .refine(input => validator.isSlug(input.toLowerCase()), {
      message:
        "Le nom d'utilisateur ne peut pas contenir que des caractères alphanumériques et pas d'espaces.",
    }),
  email: zod.string().email({ message: "L'email doit être valide." }),
  role: zod.string().min(1, { message: 'Le rôle est requis.' }),
  status: zod.string().min(1, { message: 'Le statut est requis.' }),
  verified: zod.boolean(),
});

export type UserUpdateFormSchema = zod.infer<typeof userUpdateFormSchema>;
