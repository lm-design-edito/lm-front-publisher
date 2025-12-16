import * as zod from 'zod';
import { ModelNames } from './models';
import type {
  FormInputProps,
  FormInputCheckboxProps,
  FormInputRadioGroupProps,
  FormInputRangeProps,
  FormInputColorProps,
} from '@common/components/forms';
import { Text } from '@common/components/text';
import { colorSchema } from '@utils/schema-validations';
export type FormInputFieldText = FormInputProps | FormInputCheckboxProps;

export type DefaultModelConfigField = {
  name: string;
  validation: zod.ZodTypeAny;
};

export type InputModelConfigField = {
  type: 'input';
  defaultValue?: string;
  properties: FormInputProps;
} & DefaultModelConfigField;

export type CheckboxModelConfigField = {
  type: 'checkbox';
  defaultChecked?: boolean;
  properties: FormInputCheckboxProps;
} & DefaultModelConfigField;

export type RadioGroupModelConfigField = {
  type: 'radio-group';
  defaultValue?: string;
  properties: FormInputRadioGroupProps;
} & DefaultModelConfigField;

export type InputRangeModelConfigField = {
  type: 'input-range';
  defaultValue?: number;
  properties: FormInputRangeProps;
} & DefaultModelConfigField;

export type InputColorModelConfigField = {
  type: 'input-color';
  defaultValue?: number;
  properties: FormInputColorProps;
} & DefaultModelConfigField;

export type ModelConfigField =
  | InputModelConfigField
  | CheckboxModelConfigField
  | InputRangeModelConfigField
  | InputColorModelConfigField
  | RadioGroupModelConfigField;

export type ModelConfigFieldTypes = Record<
  string,
  { formFields: ModelConfigField[] }
>;

const MODEL_CONFIG_FIELDS: ModelConfigFieldTypes = {
  [ModelNames.BOOK_COVER_PLAIN]: {
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
                position: 'bottom-right',
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
  },
  [ModelNames.BOOK_COVER_STRIPES]: {
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
  },
  [ModelNames.BOOK_COVER_GRADIENT]: {
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
        validation: zod
          .string()
          .default('45')
          .transform(value => {
            const parsed = parseInt(value, 10);
            if (isNaN(parsed) || parsed < 0 || parsed > 360) {
              return 45;
            }
            return parsed;
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
        validation: colorSchema,
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
        validation: colorSchema,
      },
    ],
  },
};

export default MODEL_CONFIG_FIELDS;
