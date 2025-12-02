import { ModelList } from '../config';

export const getModelConfigDefaultOptions = (
  modelName?: string,
): Record<string, unknown> => {
  if (!modelName) {
    return {};
  }
  const foundModel = ModelList.find(m => m.name === modelName);
  if (
    foundModel &&
    'defaultOptions' in foundModel &&
    foundModel.defaultOptions
  ) {
    return foundModel.defaultOptions;
  }
  return {};
};
