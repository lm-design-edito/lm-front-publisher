import MODEL_CONFIG_FIELDS, {
  type ModelConfigField,
} from '../config/model-config-fields';

export const getModelConfigFields = (
  modelName?: string,
): ModelConfigField[] => {
  const fallbackFields: ModelConfigField[] = [];
  if (!modelName) {
    return fallbackFields;
  }

  const modelConfig =
    MODEL_CONFIG_FIELDS[modelName as keyof typeof MODEL_CONFIG_FIELDS];
  if (modelConfig) {
    return modelConfig.formFields || [];
  }

  return fallbackFields;
};
