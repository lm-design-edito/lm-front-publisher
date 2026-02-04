import * as zod from 'zod';
import { getModelConfigFields } from '../../utils/get-model-config-fields';
import { templateNameValues, type ModelConfigField } from '../../config';
import { Logger } from '@utils/logger';

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
      template: zod.enum(templateNameValues as [string, ...string[]], {
        message: 'Veuillez sélectionner un modèle.',
      }),
    },
    {
      message: 'Veuillez sélectionner un modèle.',
    },
  ),
  outputFormat: zod
    .enum(['png', 'jpg', 'webp'], {
      message: "Le format de sortie doit être 'png', 'jpg' ou 'webp'.",
    })
    .default('png')
    .optional()
    .transform(val => ({ type: val || 'png' })),
  outputFileName: zod.string().optional(),
});

// ✅ Type guard pour vérifier si un champ a une validation
function hasValidation(field: ModelConfigField): field is ModelConfigField & {
  name: string;
  validation: zod.ZodTypeAny;
} {
  return (
    'name' in field &&
    typeof field.name === 'string' &&
    field.name !== '' &&
    'validation' in field &&
    field.validation !== undefined
  );
}

// ✅ Fonction récursive pour extraire tous les champs avec validation
function extractValidatableFields(
  fields: ModelConfigField[],
): Array<ModelConfigField & { name: string; validation: zod.ZodTypeAny }> {
  const validatableFields: Array<
    ModelConfigField & { name: string; validation: zod.ZodTypeAny }
  > = [];

  function traverse(fieldList: ModelConfigField[]) {
    fieldList.forEach(field => {
      if (field.type === 'fieldset' && 'fields' in field && field.fields) {
        // ✅ Fieldset : explorer les champs enfants
        traverse(field.fields);
      } else if (field.type === 'custom') {
        // ✅ Custom : ignorer (pas de validation)
        return;
      } else if (hasValidation(field)) {
        // ✅ Champ valide : ajouter à la liste
        validatableFields.push(field);
      }
    });
  }

  traverse(fields);
  return validatableFields;
}

// ✅ Fonction pour construire la structure d'objet imbriqué
function buildNestedSchema(
  fields: Array<{ name: string; validation: zod.ZodTypeAny }>,
) {
  const additionalFields: Record<string, zod.ZodTypeAny> = {};

  fields.forEach(field => {
    const parts = field.name.split('.');

    if (parts.length === 1) {
      // ✅ Champ simple (ex: "angle")
      additionalFields[field.name] = field.validation;
    } else {
      // ✅ Champ imbriqué (ex: "colors.primary")
      const [parentKey, ...childPath] = parts;
      const childKey = childPath.join('.');

      if (!additionalFields[parentKey]) {
        // Créer l'objet parent
        additionalFields[parentKey] = zod.object({
          [childKey]: field.validation,
        });
      } else {
        // Étendre l'objet parent existant
        const existingSchema = additionalFields[parentKey];

        if (existingSchema instanceof zod.ZodObject) {
          additionalFields[parentKey] = existingSchema.extend({
            [childKey]: field.validation,
          });
        } else {
          Logger.warn(
            'image-generator-form.schema.buildNestedSchema',
            `Field "${parentKey}" already exists but is not an object. Skipping "${field.name}".`,
          );
        }
      }
    }
  });

  return additionalFields;
}

export const createDynamicImageGeneratorFormSchema = (modelName?: string) => {
  if (!modelName) return baseImageGeneratorFormSchema;
  console.group(`📋 Building schema for model: ${modelName}`);

  const modelConfigFields = getModelConfigFields(modelName);

  const validatableFields = extractValidatableFields(modelConfigFields);

  const additionalFields = buildNestedSchema(validatableFields);

  console.groupEnd();
  // ✅ Étendre le schéma de base
  return baseImageGeneratorFormSchema.extend(additionalFields);
};
