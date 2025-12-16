import { z } from 'zod';

export const colorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Format hexadécimal invalide (ex: #FF5733)');

export type ColorFormData = z.infer<typeof colorSchema>;
