import { Text } from '@common/components/text';
import { colorSchema } from '@utils/schema-validations';
import * as zod from 'zod';
import type { ModelFormConfig } from './types';

export const modelBookCoverGradientFormConfig: ModelFormConfig = {
  formFields: [
    {
      name: 'angle',
      type: 'input-range',
      defaultValue: 90,
      properties: {
        label: 'Angle du dégradé :',
        labelProps: {
          htmlFor: 'angle',
        },
        helperProps: {
          text: (
            <>
              Définit l'angle du dégradé de fond.
              <Text size="sm" fontStyle="italic">
                {' '}
                Ex : 0° pour un dégradé horizontal, 45° pour un dégradé en
                diagonale, 90° pour un dégradé vertical
              </Text>
            </>
          ),
          position: 'right',
        },
        inputProps: {
          type: 'range',
          min: 0,
          max: 360,
          step: 1,
        },
        formattedValue: value => `${value}°`,
      },
      validation: zod.coerce
        .number()
        .default(90)
        .transform(value => {
          if (isNaN(value) || value < 0 || value > 360) {
            return 90;
          }
          return value;
        }),
    },
    {
      name: 'color-start',
      type: 'input-color',
      properties: {
        label: 'Couleur de début du dégradé :',
        labelProps: { htmlFor: 'color-start' },
        helperProps: {
          text: "Définit la couleur de fin du dégradé de fond. Laisser vide pour un calcul automatique à partir des couleurs de l'image.",
          position: 'top-left',
        },
        inputProps: {},
      },
      validation: zod.union([
        colorSchema.optional(),
        zod.literal(''),
        zod.undefined(),
      ]),
    },
    {
      name: 'color-end',
      type: 'input-color',
      properties: {
        label: 'Couleur de fin du dégradé :',
        labelProps: { htmlFor: 'color-end' },
        helperProps: {
          text: "Définit la couleur de début du dégradé de fond. Laisser vide pour un calcul automatique à partir des couleurs de l'image.",
          position: 'top-left',
        },
        inputProps: {},
      },
      validation: zod.union([
        colorSchema.optional(),
        zod.literal(''),
        zod.undefined(),
      ]),
    },
  ],
};
