import { ModelList } from '../config';

export const getModelConfigDefaultOptions = (
  modelName?: string,
  formValues?: { imageCount: number } & Record<string, unknown>,
): Record<string, unknown> => {
  if (!modelName) {
    return {};
  }
  const foundModel = ModelList.find(m => m.name === modelName);
  if (
    foundModel &&
    'getDefaultOptions' in foundModel &&
    foundModel.getDefaultOptions &&
    formValues
  ) {
    return foundModel.getDefaultOptions(formValues);
  }
  return {};
};
