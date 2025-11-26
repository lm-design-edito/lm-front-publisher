import { ModelList } from '../config';

export const getModelConfigDefaultOptions = (
  modelName?: string,
): Record<string, unknown> => {
  if (!modelName) {
    return {};
  }
  console.log({ ModelList, modelName });
  const foundModel = ModelList.find(m => m.name === modelName);
  console.log('getModelConfigDefaultOptions', { foundModel, modelName });
  if (
    foundModel &&
    'defaultOptions' in foundModel &&
    foundModel.defaultOptions
  ) {
    return foundModel.defaultOptions;
  }
  return {};
};
