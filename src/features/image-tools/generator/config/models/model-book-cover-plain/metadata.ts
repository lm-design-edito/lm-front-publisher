import type { ModelMetadata } from '../types';
import thumbnail from './thumbnail.jpg';
import { TemplateNames } from '../templates';

export const MODEL_METADATA: ModelMetadata = {
  name: 'BOOK_COVER_PLAIN',
  template: TemplateNames.BOOK,
  category: 'Livre',
  label: 'Uni',
  thumbnail,
};
