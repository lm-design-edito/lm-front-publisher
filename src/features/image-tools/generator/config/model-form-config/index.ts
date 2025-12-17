import { ModelNames } from '../models';
import { modelBookCoverGradientFormConfig } from './model-book-cover-gradient';
import { modelBookCoverPlainFormConfig } from './model-book-cover-plain';
import { modelBookCoverStripesFormConfig } from './model-book-cover-stripes';
import type { ModelConfigRegistry } from './types';

const MODEL_CONFIG_FIELDS: ModelConfigRegistry = {
  [ModelNames.BOOK_COVER_PLAIN]: modelBookCoverPlainFormConfig,
  [ModelNames.BOOK_COVER_STRIPES]: modelBookCoverStripesFormConfig,
  [ModelNames.BOOK_COVER_GRADIENT]: modelBookCoverGradientFormConfig,
};

export default MODEL_CONFIG_FIELDS;

export type {
  ModelFormConfig,
  ModelFormFieldConfig,
  ModelConfigRegistry,
  CustomModelConfigField,
} from './types';
