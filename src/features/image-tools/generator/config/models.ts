import templateBookPreview from '../assets/preview-template-book.jpg';
import templateBookPreviewStripes from '../assets/preview-template-book-stripes.jpg';

export const TemplateNames = {
  BOOK: 'BOOK',
  TEST: 'test',
} as const;

export const ModelNames = {
  BOOKCOVERPLAIN: 'BOOKCOVERPLAIN',
  BOOKCOVERSTRIPES: 'BOOKCOVERSTRIPES',
} as const;

export const TemplateNameValues = Object.values(TemplateNames);

export const ModelList: {
  name: string;
  template: string;
  label: string;
  thumbnail: string;
  defaultOptions?: Record<string, unknown>;
}[] = [
  {
    name: ModelNames.BOOKCOVERPLAIN,
    template: TemplateNames.BOOK,
    label: 'Couverture de livre',
    thumbnail: templateBookPreview,
    defaultOptions: {
      backgroundType: 'plain'
    }
  },
  {
    name: ModelNames.BOOKCOVERSTRIPES,
    template: TemplateNames.BOOK,
    label: 'Couverture de livre (rayures)',
    thumbnail: templateBookPreviewStripes,
    defaultOptions: {
      backgroundType: 'stripes',
    },
  },
];
