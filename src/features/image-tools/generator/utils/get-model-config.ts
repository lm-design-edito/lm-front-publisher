import { Logger } from '@utils/logger';
import { MODEL_CONFIGS } from '../config';

export const getModelConfig = (modelName: string) => {
  // Pas de modèle sélectionné
  if (!modelName) {
    return null;
  }

  const modelConfig = MODEL_CONFIGS[modelName];

  if (!modelConfig) {
    Logger.log('Model config not found for:', modelName);
    return null;
  }

  return modelConfig;
};
