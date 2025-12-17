import { Text } from '@common/components/text';
import { colorSchema } from '@utils/schema-validations';
import * as zod from 'zod';
import type { ModelFormConfig } from './types';
import { GradientPreview } from '../../components/image-generator-form/gradient-preview';

export const modelBookCoverGradientFormConfig: ModelFormConfig = {
  formFields: [
    {
      type: 'fieldset',
      name: 'gradient',
      properties: {
        legend: 'Options du fond dégradé',
      },
      fields: [
        {
          name: 'gradient.angle',
          type: 'input-range',
          defaultValue: 90,
          properties: {
            label: 'Angle du dégradé :',
            labelProps: {
              htmlFor: 'gradient.angle',
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
          name: 'gradient.startColor',
          type: 'input-color',
          properties: {
            label: 'Couleur de début du dégradé :',
            labelProps: { htmlFor: 'gradient.startColor' },
            helperProps: {
              text: "Définit la couleur de fin du dégradé de fond. Laisser vide pour un calcul automatique à partir des couleurs de l'image.",
              position: 'top-left',
            },
            inputProps: {},
          },
          validation: colorSchema.optional().transform(value => {
            if (value === '') {
              return undefined;
            }
            return value;
          }),
        },
        {
          name: 'gradient.stopColor',
          type: 'input-color',
          properties: {
            label: 'Couleur de fin du dégradé :',
            labelProps: { htmlFor: 'gradient.stopColor' },
            helperProps: {
              text: "Définit la couleur de début du dégradé de fond. Laisser vide pour un calcul automatique à partir des couleurs de l'image.",
              position: 'top-left',
            },
            inputProps: {},
          },
          validation: colorSchema.optional().transform(value => {
            if (value === '') {
              return undefined;
            }
            return value;
          }),
        },
        {
          type: 'custom',
          name: 'gradient-preview',
          dependencies: [
            'gradient.angle',
            'gradient.startColor',
            'gradient.stopColor',
          ],
          render: values => (
            <GradientPreview
              angle={values['gradient.angle'] as number}
              startColor={values['gradient.startColor'] as string}
              stopColor={values['gradient.stopColor'] as string}
            />
          ),
        },
      ],
    },
  ],
};
