import * as zod from 'zod';
import { TemplateNameValues } from '../../types';
import { getModelConfigFields } from '../../utils/get-model-config-fields';

export const baseImageGeneratorFormSchema = zod.object({
  fileIds: zod
    .array(
      zod.string({
        message: 'Veuillez sélectionner au moins une image',
      }),
      {
        message: 'Veuillez sélectionner au moins une image',
      },
    )
    .min(1, {
      message: 'Veuillez sélectionner au moins une image',
    }),
  model: zod.object(
    {
      name: zod.string(),
      template: zod.enum(TemplateNameValues as [string, ...string[]], {
        message: 'Veuillez sélectionner un modèle.',
      }),
    },
    {
      message: 'Veuillez sélectionner un modèle.',
    },
  ),
  outputFileName: zod.string().optional(),
});

export const createDynamicImageGeneratorFormSchema = (modelName?: string) => {
  if (!modelName) return baseImageGeneratorFormSchema;

  const modelConfigFields = getModelConfigFields(modelName);

  // Utiliser un Record pour gérer les types correctement
  const additionalFields: Record<string, zod.ZodTypeAny> = {};

  modelConfigFields.forEach(field => {
    const parts = field.name.split('.');

    if (parts.length > 1) {
      const [parentKey, childKey] = parts;

      // Si l'objet parent n'existe pas encore, le créer
      if (!additionalFields[parentKey]) {
        additionalFields[parentKey] = zod.object({
          [childKey]: field.validation,
        });
      } else {
        // Si l'objet parent existe déjà, l'étendre
        const existingSchema = additionalFields[parentKey] as zod.AnyZodObject;
        additionalFields[parentKey] = existingSchema.extend({
          [childKey]: field.validation,
        });
      }
    } else {
      additionalFields[field.name] = field.validation;
    }
  });

  return baseImageGeneratorFormSchema.extend(additionalFields);
};
