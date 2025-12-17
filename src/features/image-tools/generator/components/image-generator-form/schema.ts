import * as zod from 'zod';
import { TemplateNameValues } from '../../types';
import { getModelConfigFields } from '../../utils/get-model-config-fields';
import type { ModelFormFieldConfig } from '../../config';

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

// ✅ Type guard pour vérifier si un champ a une validation
function hasValidation(
  field: ModelFormFieldConfig,
): field is ModelFormFieldConfig & {
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
  fields: ModelFormFieldConfig[],
): Array<ModelFormFieldConfig & { name: string; validation: zod.ZodTypeAny }> {
  const validatableFields: Array<
    ModelFormFieldConfig & { name: string; validation: zod.ZodTypeAny }
  > = [];

  function traverse(fieldList: ModelFormFieldConfig[]) {
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
          console.warn(
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

  // ✅ Extraire tous les champs validables (recursive)
  const validatableFields = extractValidatableFields(modelConfigFields);

  console.log(
    '✅ Extracted fields:',
    validatableFields.map(f => f.name),
  );

  // ✅ Construire le schéma des champs additionnels
  const additionalFields = buildNestedSchema(validatableFields);

  console.log('🏗️  Additional fields:', Object.keys(additionalFields));
  console.groupEnd();
  // ✅ Étendre le schéma de base
  return baseImageGeneratorFormSchema.extend(additionalFields);
};
