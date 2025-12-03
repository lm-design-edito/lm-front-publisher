import templateBookPreview from '../assets/preview-template-book.jpg';
import templateBookPreviewStripes from '../assets/preview-template-book-stripes.jpg';
import type { Model } from '../types';

export const TemplateNames = {
  BOOK: 'BOOK',
} as const;

export const ModelNames = {
  BOOK_COVER_PLAIN: 'book-cover-plain',
  BOOK_COVER_STRIPES: 'book-cover-stripes',
} as const;

export const TemplateNameValues = Object.values(TemplateNames);

export const ModelList: Model[] = [
  {
    name: ModelNames.BOOK_COVER_PLAIN,
    template: TemplateNames.BOOK,
    label: 'Couverture de livre',
    thumbnail: templateBookPreview,
    getDefaultOptions: ({ imageCount }) => ({
      backgroundType: 'plain',
      ...(imageCount === 3
        ? {
            imageFitAreaRatios: {
              width: 0.9,
              height: 0.95,
            },
          }
        : {}),
    }),
  },
  {
    name: ModelNames.BOOK_COVER_STRIPES,
    template: TemplateNames.BOOK,
    label: 'Couverture de livre (rayures)',
    thumbnail: templateBookPreviewStripes,
    getDefaultOptions: ({ imageCount }) => ({
      backgroundType: 'plain',
      ...(imageCount === 3
        ? {
            imageFitAreaRatios: {
              width: 0.9,
              height: 0.95,
            },
          }
        : {}),
    }),
  },
];
