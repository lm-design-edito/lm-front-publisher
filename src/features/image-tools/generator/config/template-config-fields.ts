import type { FormInputProps } from '@common/components/forms/form-input';
import * as zod from 'zod';
import { TemplateNames } from './templates';
import type { FormInputCheckboxProps } from '@common/components/forms/form-input-checkbox';

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

export type TemplateConfigField =
  | InputTemplateConfigField
  | CheckboxTemplateConfigField;

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
        name: 'colors.auto',
        type: 'checkbox',
        defaultChecked: false,
        properties: {
          label: "Utiliser les couleurs de l'image principale comme fond",
          inputProps: {
            type: 'checkbox',
          },
        },
        validation: zod.boolean().optional(),
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
        validation: zod.boolean().optional(),
      },
    ],
  },
};

export default TEMPLATE_CONFIG_FIELDS;
