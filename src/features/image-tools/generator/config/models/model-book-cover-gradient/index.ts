import { MODEL_METADATA } from './metadata';
import { modelConfig, type FormValues, type OutputAPIPayload } from './config';
import type { ModelConfigWrapper } from '../types';

export type {
  FormValues as BookCoverGradientFormValues,
  OutputAPIPayload as BookCoverGradientOutputAPIPayload,
};
export { MODEL_METADATA as MODEL_BOOK_COVER_GRADIENT_METADATA };

export const modelBookCoverGradientConfig: ModelConfigWrapper<
  FormValues,
  OutputAPIPayload
> = {
  name: MODEL_METADATA.name,
  config: modelConfig,
};
