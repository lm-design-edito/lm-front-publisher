import { modelBookCoverGradientConfig } from './model-book-cover-gradient';
import { modelBookCoverPlainConfig } from './model-book-cover-plain';
import { modelBookCoverStripesConfig } from './model-book-cover-stripes';

export const MODEL_CONFIGS = {
  [modelBookCoverPlainConfig.name]: modelBookCoverPlainConfig.config,
  [modelBookCoverGradientConfig.name]: modelBookCoverGradientConfig.config,
  [modelBookCoverStripesConfig.name]: modelBookCoverStripesConfig.config,
};
