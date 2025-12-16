import * as zod from 'zod';
import type { ModelFormConfig } from './types';

export const modelBookCoverStripesFormConfig: ModelFormConfig = {
  formFields: [
    {
      name: 'colors',
      type: 'radio-group',
      defaultValue: 'default',
      properties: {
        label: 'Couleur de fond',
        inputGroupProps: [
          {
            label: 'Gris',
            id: 'default',
            inputProps: {
              type: 'radio',
            },
          },
          {
            label: 'Couleur secondaire',
            id: 'useMain',
            inputProps: {
              type: 'radio',
            },
            helperProps: {
              text: "Cette Option permet de sélectionner la seconde couleur la plus utilisée dans l'image et de l'utiliser comme couleur de fond.",
              position: 'top-right',
            },
          },
          {
            label: 'Couleur principale complémentaire',
            id: 'useComplementary',
            inputProps: {
              type: 'radio',
            },
            helperProps: {
              text: "Cette option permet de sélectionner la couleur la plus utilisée dans l'image et d'en obtenir sa couleur complémentaire.",
              position: 'top-right',
              size: 'sm',
            },
          },
        ],
      },
      validation: zod
        .string()
        .default('default')
        .transform(value => {
          switch (value) {
            case 'useMain':
              return { useMain: true, useComplementary: false };
            case 'useComplementary':
              return { useMain: false, useComplementary: true };
            default:
              return { useMain: false, useComplementary: false };
          }
        }),
    },
  ],
};
