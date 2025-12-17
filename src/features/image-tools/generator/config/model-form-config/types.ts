import type {
  FormInputCheckboxProps,
  FormInputColorProps,
  FormInputProps,
  FormInputRadioGroupProps,
  FormInputRangeProps,
} from '@common/components/forms';
import * as zod from 'zod';

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

export type CustomModelConfigField = {
  name: string;
  type: 'custom';
  // Fonction qui reçoit les valeurs du formulaire et retourne un ReactNode
  render: (values: Record<string, unknown>) => React.ReactNode;
  // Liste des champs dont dépend ce composant (pour optimisation)
  dependencies?: string[];
};

export type FieldsetModelConfigField = {
  name: string;
  type: 'fieldset';
  properties: {
    legend: string;
    description?: string;
  };
  fields: ModelFormFieldConfig[];
};

export type ModelFormFieldConfig =
  | ((
      | InputModelConfigField
      | CheckboxModelConfigField
      | InputRangeModelConfigField
      | InputColorModelConfigField
      | RadioGroupModelConfigField
    ) &
      DefaultModelConfigField)
  | FieldsetModelConfigField
  | CustomModelConfigField;

export type ModelFormConfig = {
  formFields: ModelFormFieldConfig[];
};

export type ModelConfigRegistry = Record<
  string,
  { formFields: ModelFormFieldConfig[] }
>;
