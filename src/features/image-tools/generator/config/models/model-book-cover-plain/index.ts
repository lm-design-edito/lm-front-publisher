import { MODEL_METADATA } from './metadata';
import { modelConfig, type OutputAPIPayload, type FormValues } from './config';
import type { ModelConfigWrapper } from '../types';

export type {
  FormValues as BookCoverPlainFormValues,
  OutputAPIPayload as BookCoverPlainOutputAPIPayload,
};
export { MODEL_METADATA as MODEL_BOOK_COVER_PLAIN_METADATA };

export const modelBookCoverPlainConfig: ModelConfigWrapper<
  FormValues,
  OutputAPIPayload
> = {
  name: MODEL_METADATA.name,
  config: modelConfig,
};
