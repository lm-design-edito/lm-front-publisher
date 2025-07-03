export const TinyLMGFitOptions = [
  {
    value: 'cover',
    label: 'Cover',
    description: 'The image will cover the entire area, cropping if necessary.',
  },
  {
    value: 'contain',
    label: 'Contain',
    description: 'The image will fit within the area without cropping.',
  },
  {
    value: 'fill',
    label: 'Fill',
    description:
      'The image will stretch to fill the area, possibly distorting it.',
  },
  {
    value: 'inside',
    label: 'Inside',
    description:
      'The image will be resized to fit inside the area, maintaining its aspect ratio.',
  },
  {
    value: 'outside',
    label: 'Outside',
    description:
      'The image will be resized to fill the area, maintaining its aspect ratio, but may overflow the area.',
  },
];
