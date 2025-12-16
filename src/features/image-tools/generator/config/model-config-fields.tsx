import * as zod from 'zod';
import { ModelNames } from './models';
import type {
  FormInputProps,
  FormInputCheckboxProps,
  FormInputRadioGroupProps,
  FormInputRangeProps,
} from '@common/components/forms';
import { Text } from '@common/components/text';
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

export type ModelConfigField =
  | InputModelConfigField
  | CheckboxModelConfigField
  | InputRangeModelConfigField
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
            position: 'top-left',
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
    ],
  },
};

export default MODEL_CONFIG_FIELDS;
