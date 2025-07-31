export const TinyLMGFitOptions = [
  {
    value: 'cover',
    label: 'Cover',
    description: "L'image couvrira toute la zone, en rognant si nécessaire.",
  },
  {
    value: 'contain',
    label: 'Contain',
    description: "L'image s'adaptera à la zone sans être rognée.",
  },
  {
    value: 'fill',
    label: 'Fill',
    description: "L'image s'étirera pour remplir la zone, pouvant la déformer.",
  },
  {
    value: 'inside',
    label: 'Inside',
    description:
      "L'image sera redimensionnée pour s'adapter à la zone, en maintenant son ratio.",
  },
  {
    value: 'outside',
    label: 'Outside',
    description:
      "L'image sera redimensionnée pour remplir la zone, en maintenant son ratio, mais peut dépasser la zone.",
  },
];
