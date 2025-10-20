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
      {
        name: 'backgroundColor',
        type: 'input',
        properties: {
          label: 'Couleur de fond (Optionnel)',
          inputProps: {
            type: 'text',
            value: '#FFFFFF',
          },
        },
        validation: zod.string().optional(),
      },
      {
        name: 'secondaryBackgroundColor',
        type: 'input',
        properties: {
          label: 'Couleur de fond secondaire (Optionnel)',
          inputProps: {
            type: 'text',
            value: '#FFFFFF',
          },
        },
        validation: zod.string().optional(),
      },
      {
        name: 'autoCalcColors',
        type: 'checkbox',
        properties: {
          label: 'Calcul automatiquement les couleurs',
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
