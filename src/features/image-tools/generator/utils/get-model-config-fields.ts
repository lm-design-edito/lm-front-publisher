import MODEL_CONFIG_FIELDS, {
  type ModelConfigField,
} from '../config/model-config-fields';

export const getModelConfigFields = (
  modelName?: string,
): ModelConfigField[] => {
  if (!modelName) return [];
  return MODEL_CONFIG_FIELDS[modelName]?.formFields ?? [];
};
