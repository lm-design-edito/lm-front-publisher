import type { FormInputProps } from '@common/components/forms/form-input';
import * as zod from 'zod';
import { TemplateNames } from './templates';

export type FormInputFieldText = FormInputProps;

export type TemplateConfigField = {
  name: string;
  type: string;
  properties: FormInputFieldText;
  validation: zod.ZodTypeAny;
};

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
    ],
  },
};

export default TEMPLATE_CONFIG_FIELDS;
