import { imageFormat, imageFormatToWidth } from './format';
import { imageGenerate } from './generate';
import { imageTransform } from './transform';

export const image = {
  format: imageFormat,
  formatToWidth: imageFormatToWidth,
  generate: imageGenerate,
  transform: imageTransform,
};

export type { ImageGenerateResponseSuccessType } from './generate';

export type { ImageTransformResponseSuccessType } from './transform';
