import * as zod from 'zod';
import { TinyLMGFitOptions, TinyLMGFormats } from '../../config';

export const TinyLMGFormatsValues = TinyLMGFormats.map(
  format => format.value,
) as [string, ...string[]];

export const TinyLMGFitOptionsFormatValues = TinyLMGFitOptions.map(
  option => option.value,
) as [string, ...string[]];

export const tinyLMGFormSchema = zod.object({
  image: zod.instanceof(File, {
    message: 'Veuillez sélectionner une image (une seule à la fois).',
  }),
  imageValue: zod.string().optional(),
  formats: zod.array(
    zod.enum(TinyLMGFormatsValues, {
      message: 'Veuillez sélectionner au moins un format.',
    }),
    {
      message: 'Veuillez sélectionner au moins un format.',
    },
  ),
  width: zod.coerce
    .number()
    .min(1, {
      message: 'La largeur doit être supérieure à 0.',
    })
    .refine(value => value > 0, {
      message: 'La hauteur doit être supérieure à 0.',
    }),
  height: zod.coerce
    .number()
    .min(1, {
      message: 'La largeur doit être supérieure à 0.',
    })
    .refine(value => value > 0, {
      message: 'La hauteur doit être supérieure à 0.',
    }),
  fit: zod.enum(TinyLMGFitOptionsFormatValues, {
    message: 'Veuillez sélectionner un mode de redimensionnement.',
  }),
  quality: zod.coerce.number().min(1).max(100).optional(),
  compressionLevel: zod.coerce.number().min(0).max(90).optional(),
});

export type TinyLMGFormSchemaValues = zod.infer<typeof tinyLMGFormSchema>;
