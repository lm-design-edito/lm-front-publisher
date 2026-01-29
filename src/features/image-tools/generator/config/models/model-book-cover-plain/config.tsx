import * as zod from 'zod';
import type { ModelConfig } from '../types';
import { Text } from '@common/components/text';
import { CircleBadge } from '@common/components/circle-badge';

export type FormValues = {
  colors: {
    useMain: boolean;
    useComplementary: boolean;
  };
};

export type OutputAPIPayload = {
  backgroundType: 'plain';
  colors?: FormValues['colors'];
};

export const modelConfig: ModelConfig<FormValues, OutputAPIPayload> = {
  buildAPIPayload: (formValues, context): OutputAPIPayload => {
    const { ...restFormValues } = formValues;
    return {
      ...restFormValues,
      backgroundType: 'plain',
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
    };
  },
  fields: [
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
              text: (
                <Text tag="span">
                  Selectionne la seconde couleur la plus utilisée dans l'image{' '}
                  <CircleBadge
                    size="s"
                    display="inline-flex"
                    className="lm-publisher-m-r-spacer-05 lm-publisher-m-l-spacer-05"
                  >
                    1
                  </CircleBadge>{' '}
                  comme couleur de fond.
                </Text>
              ),
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
              text: (
                <Text tag="span">
                  Selectionne la couleur complémentaire de a couleur la plus
                  utilisée dans l'image{' '}
                  <CircleBadge
                    size="s"
                    display="inline-flex"
                    className="lm-publisher-m-r-spacer-05 lm-publisher-m-l-spacer-05"
                  >
                    1
                  </CircleBadge>{' '}
                  comme couleur de fond.
                </Text>
              ),
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
