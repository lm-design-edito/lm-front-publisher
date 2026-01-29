import * as zod from 'zod';
import type { ModelConfig } from '../types';

import { Text } from '@common/components/text';
import { colorSchema } from '@utils/schema-validations';
import { GradientPreview } from '../../../components/image-generator-form/gradient-preview';
import { Divider } from '@common/components/divider';
import { CircleBadge } from '@common/components/circle-badge';

export type FormValues = {
  gradient: {
    colorMode: 'gray' | 'main' | 'complementary' | 'custom';
    angle: number;
    type: 'linear' | 'radial';
    startColor?: string;
    stopColor?: string;
  };
};

export type OutputAPIPayload = {
  backgroundType: 'gradient';
  colors?: {
    useMain: boolean;
    useComplementary: boolean;
  };
  gradient: {
    angle: number;
    type: 'linear' | 'radial';
    startColor?: string;
    stopColor?: string;
  };
};

export const modelConfig: ModelConfig<FormValues, OutputAPIPayload> = {
  buildAPIPayload: (formValues, context): OutputAPIPayload => {
    const { gradient, ...restFormValues } = formValues;
    const output: OutputAPIPayload = {
      ...restFormValues,
      backgroundType: 'gradient',
      ...(context.imageCount === 2
        ? {
            imageFitAreaRatios: {
              width: 0.8,
              height: 0.8,
            },
          }
        : {}),
      ...(context.imageCount === 1
        ? {
            imageFitAreaRatios: {
              width: 0.8,
              height: 0.8,
            },
          }
        : {}),
      gradient: {
        angle: gradient.angle,
        type: gradient.type,
        startColor: gradient.startColor,
        stopColor: gradient.stopColor,
      },
    };

    switch (gradient.colorMode) {
      case 'main':
        {
          output.colors = {
            useMain: true,
            useComplementary: false,
          };
        }
        break;
      case 'complementary':
        {
          output.colors = {
            useMain: false,
            useComplementary: true,
          };
        }
        break;
      case 'custom':
        {
          if (!gradient.startColor || !gradient.stopColor) {
            output.colors = {
              useMain: true,
              useComplementary: false,
            };
          } else {
            output.colors = {
              useMain: false,
              useComplementary: false,
            };
          }
        }
        break;
      default:
        {
          output.colors = {
            useMain: false,
            useComplementary: false,
          };
        }
        break;
    }
    return output;
  },
  fields: [
    {
      type: 'fieldset',
      name: 'gradient',
      properties: {
        legend: 'Options du fond',
      },
      fields: [
        {
          name: 'gradient.type',
          type: 'radio-group',
          defaultValue: 'linear',
          properties: {
            label: 'Type de dégradé :',
            inputGroupProps: [
              {
                label: 'Linéaire',
                id: 'linear',
                inputProps: {
                  type: 'radio',
                },
              },
              {
                label: 'Radial',
                id: 'radial',
                inputProps: {
                  type: 'radio',
                },
              },
            ],
          },
          validation: zod.enum(['radial', 'linear']).default('linear'),
        },
        {
          name: 'gradient.angle',
          type: 'input-range',
          conditional: {
            field: 'gradient.type',
            value: 'linear',
            supportDefault: true,
          },
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
          name: 'gradient.colorMode',
          type: 'radio-group',
          defaultValue: 'custom',
          properties: {
            label: 'Mode de couleur du dégradé',
            inputGroupProps: [
              {
                label: 'Gris',
                id: 'gray',
                inputProps: {
                  type: 'radio',
                },
                helperProps: {
                  text: 'Utilise un dégradé de gris par défaut',
                  position: 'top-right',
                },
              },
              {
                label: 'Couleur secondaire',
                id: 'main',
                inputProps: {
                  type: 'radio',
                },
                helperProps: {
                  text: (
                    <Text tag="span">
                      Utilise la 2e couleur principale de l'image{' '}
                      <CircleBadge
                        size="s"
                        display="inline-flex"
                        className="lm-publisher-m-r-spacer-05"
                      >
                        1
                      </CircleBadge>
                      pour créer le dégradé
                    </Text>
                  ),
                  position: 'top-right',
                },
              },
              {
                label: 'Couleur complémentaire',
                id: 'complementary',
                inputProps: {
                  type: 'radio',
                },
                helperProps: {
                  text: (
                    <Text tag="span">
                      Utilise la couleur complémentaire de l'image{' '}
                      <CircleBadge
                        size="s"
                        display="inline-flex"
                        className="lm-publisher-m-r-spacer-05"
                      >
                        1
                      </CircleBadge>
                      pour créer le dégradé
                    </Text>
                  ),
                  position: 'top-right',
                },
              },
            ],
          },
          validation: zod
            .enum(['gray', 'main', 'complementary'])
            .default('gray'),
        },
        {
          type: 'fieldset',
          name: 'gradient-color-custom',
          properties: {
            legend: 'Couleur personalisées du dégradé',
          },
          fields: [
            {
              name: 'gradient.startColor',
              type: 'input-color',
              properties: {
                label: 'Couleur de début du dégradé :',
                labelProps: { htmlFor: 'gradient.startColor' },
                helperProps: {
                  text: (
                    <Text tag="span">
                      Définit la couleur de fin du dégradé de fond.{' '}
                      <Text size="xs" tag="span">
                        Laisser le champ vide pour que le système choisisse une
                        couleur automatiquement en fonction du mode de couleur
                        choisi (Gris / secondaire / complémentaire).
                      </Text>
                    </Text>
                  ),
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
                  text: 'Définit la couleur de début du dégradé de fond',
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
          ],
        },
        {
          type: 'custom',
          name: 'gradient-divider',
          render: () => <Divider size="s" position="left" />,
        },
        {
          type: 'custom',
          name: 'gradient-preview',
          dependencies: [
            'gradient.colorMode',
            'gradient.type',
            'gradient.angle',
            'gradient.startColor',
            'gradient.stopColor',
          ],
          render: values => (
            <GradientPreview
              type={values['gradient.type'] as 'linear' | 'radial'}
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
