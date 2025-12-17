import type { ModelConfigField } from '../config';
import { getModelConfig } from './get-model-config';

export const getModelConfigFields = (
  modelName?: string,
): ModelConfigField[] => {
  const modelConfig = getModelConfig(modelName ?? '');
  if (!modelConfig) return [];
  return modelConfig?.fields ?? [];
};
