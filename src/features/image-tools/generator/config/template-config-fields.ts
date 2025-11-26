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
      // {
      //   name: 'backgroundType',
      //   type: 'radio-group',
      //   properties: {
      //     label: 'Type de fond',
      //     inputGroupProps: [
      //       {
      //         label: 'Lignes',
      //         id: 'line',
      //         inputProps: {
      //           type: 'radio',
      //         },
      //       },
      //       {
      //         label: 'Uni',
      //         id: 'plain',
      //         inputProps: {
      //           type: 'radio',
      //         },
      //       },
      //     ],
      //   },
      //   validation: zod.string().default('line'),
      // },
      {
        name: 'colors.auto',
        type: 'checkbox',
        defaultChecked: false,
        properties: {
          label: "Utiliser les couleurs de l'image principale comme fond",
          inputProps: {
            type: 'checkbox',
          },
        },
        validation: zod.boolean().default(false),
      },
      {
        name: 'colors.useComplementary',
        type: 'checkbox',
        defaultChecked: false,
        properties: {
          label:
            "Utiliser la couleur complémentaire de l'image principale comme fond",
          inputProps: {
            type: 'checkbox',
          },
        },
        validation: zod.boolean().default(false),
      },
    ],
  },
};

export default TEMPLATE_CONFIG_FIELDS;
