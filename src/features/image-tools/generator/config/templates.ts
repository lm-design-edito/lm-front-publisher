import templateBookPreview from '../assets/preview-template-book.jpg';

export const TemplateNames = {
  BOOK: 'BOOK',
  TEST: 'test',
} as const;

export const TemplateNameValues = Object.values(TemplateNames);

export const TemplateList: {
  name: string;
  label: string;
  thumbnail: string;
}[] = [
  {
    name: TemplateNames.BOOK,
    label: 'Couverture de livre',
    thumbnail: templateBookPreview,
  },
];
