import * as zod from 'zod';
import { ModelNames } from './models';
import type {
  FormInputProps,
  FormInputCheckboxProps,
  FormInputRadioGroupProps,
} from '@common/components/forms';
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

export type ModelConfigField =
  | InputModelConfigField
  | CheckboxModelConfigField
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
};

export default MODEL_CONFIG_FIELDS;
