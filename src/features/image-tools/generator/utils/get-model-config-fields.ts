import MODEL_CONFIG_FIELDS, {
  type ModelFormFieldConfig,
} from '../config/model-form-config';

export const getModelConfigFields = (
  modelName?: string,
): ModelFormFieldConfig[] => {
  if (!modelName) return [];
  return MODEL_CONFIG_FIELDS[modelName]?.formFields ?? [];
};
