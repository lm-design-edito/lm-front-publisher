import type { FormInputProps } from '@common/components/forms/form-input';
import * as zod from 'zod';
import { TemplateNames } from './templates';
import type { FormInputCheckboxProps } from '@common/components/forms/form-input-checkbox';
import type { FormInputRadioGroupProps } from '@common/components/forms/form-input-radio-group';

export type FormInputFieldText = FormInputProps | FormInputCheckboxProps;

export type DefaultTemplateConfigField = {
  name: string;
  validation: zod.ZodTypeAny;
};

export type InputTemplateConfigField = {
  type: 'input';
  defaultValue?: string;
  properties: FormInputProps;
} & DefaultTemplateConfigField;

export type CheckboxTemplateConfigField = {
  type: 'checkbox';
  defaultChecked?: boolean;
  properties: FormInputCheckboxProps;
} & DefaultTemplateConfigField;

export type RadioGroupTemplateConfigField = {
  type: 'radio-group';
  defaultValue?: string;
  properties: FormInputRadioGroupProps;
} & DefaultTemplateConfigField;

export type TemplateConfigField =
  | InputTemplateConfigField
  | CheckboxTemplateConfigField
  | RadioGroupTemplateConfigField;

export type TemplateConfigFieldTypes = Record<
  string,
  { formFields: TemplateConfigField[] }
>;

const TEMPLATE_CONFIG_FIELDS: TemplateConfigFieldTypes = {
  [TemplateNames.BOOK]: {
    formFields: [
      // {
      //   name: 'backgroundColor',
      //   type: 'input',
      //   properties: {
      //     label: 'Couleur de fond (Optionnel)',
      //     inputProps: {
      //       type: 'text',
      //       value: '#FFFFFF',
      //     },
      //   },
      //   validation: zod.string().optional(),
      // },
      // {
      //   name: 'secondaryBackgroundColor',
      //   type: 'input',
      //   properties: {
      //     label: 'Couleur de fond secondaire (Optionnel)',
      //     inputProps: {
      //       type: 'text',
      //       value: '#FFFFFF',
      //     },
      //   },
      //   validation: zod.string().optional(),
      // },
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
      // {
      //   name: 'colors.useMain',
      //   type: 'checkbox',
      //   defaultChecked: false,
      //   properties: {
      //     label: "Utiliser la couleur principale de l'image comme fond",
      //     inputProps: {
      //       type: 'checkbox',
      //     },
      //   },
      //   validation: zod.boolean().default(false),
      // },
      // {
      //   name: 'colors.useComplementary',
      //   type: 'checkbox',
      //   defaultChecked: false,
      //   properties: {
      //     label:
      //       "Utiliser la couleur complémentaire de l'image principale comme fond",
      //     inputProps: {
      //       type: 'checkbox',
      //     },
      //   },
      //   validation: zod.boolean().default(false),
      // },
    ],
  },
};

export default TEMPLATE_CONFIG_FIELDS;
