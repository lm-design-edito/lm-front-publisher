import type { ModelMetadata } from '../types';
import thumbnail from './thumbnail.jpg';
import { TemplateNames } from '../templates';

export const MODEL_METADATA: ModelMetadata = {
  name: 'BOOK_COVER_STRIPES',
  template: TemplateNames.BOOK,
  category: 'Livre',
  label: 'Rayures',
  thumbnail: thumbnail,
};
