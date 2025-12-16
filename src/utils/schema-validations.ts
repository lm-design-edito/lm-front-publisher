import { z } from 'zod';

export const colorSchema = z.object({
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Format hexadécimal invalide (ex: #FF5733)')
    .default('#000000'),
});

export type ColorFormData = z.infer<typeof colorSchema>;
