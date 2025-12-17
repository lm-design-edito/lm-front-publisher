import { MODEL_METADATA } from './metadata';
import { modelConfig, type FormValues, type OutputAPIPayload } from './config';
import type { ModelConfigWrapper } from '../types';

export type {
  FormValues as BookCoverStripesFormValues,
  OutputAPIPayload as BookCoverStripesOutputAPIPayload,
};
export { MODEL_METADATA as MODEL_BOOK_COVER_STRIPES_METADATA };

export const modelBookCoverStripesConfig: ModelConfigWrapper<
  FormValues,
  OutputAPIPayload
> = {
  name: MODEL_METADATA.name,
  config: modelConfig,
};
