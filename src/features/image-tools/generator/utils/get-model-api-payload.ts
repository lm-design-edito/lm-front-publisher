import { Logger } from '@utils/logger';
import { getModelConfig } from './get-model-config';

export const getModelAPIPayload = (
  modelName: string,
  formValues: Record<string, unknown>,
  context: { imageCount: number },
): Record<string, unknown> => {
  const modelConfig = getModelConfig(modelName);
  // Pas de modèle sélectionné
  if (!modelConfig) {
    return formValues;
  }

  if (!modelConfig.buildAPIPayload) {
    return formValues;
  }

  try {
    /* @ts-expect-error: : todo */
    return modelConfig.buildAPIPayload(formValues, context);
  } catch (error) {
    Logger.error(`Error building API payload for model ${modelName}:`, error);
    return formValues;
  }
};
