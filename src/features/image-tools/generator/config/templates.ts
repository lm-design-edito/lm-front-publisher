export const TemplateNames = {
  BOOK: 'BOOK',
} as const;

export const TemplateNameValues = Object.values(TemplateNames);

export const TemplateList: { name: string; label: string }[] = [
  {
    name: TemplateNames.BOOK,
    label: 'Couverture de livre',
  },
];
