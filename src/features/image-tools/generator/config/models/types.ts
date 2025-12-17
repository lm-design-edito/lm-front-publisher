import type {
  FormFieldsetProps,
  FormInputCheckboxProps,
  FormInputColorProps,
  FormInputProps,
  FormInputRadioGroupProps,
  FormInputRangeProps,
} from '@common/components/forms';
import * as zod from 'zod';

export type BaseFormField = {
  name: string;
  conditional?: {
    field: string;
    value: unknown;
    supportDefault?: boolean;
  };
};

export type DefaultModelConfigField = {
  validation: zod.ZodTypeAny;
} & BaseFormField;

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
  type: 'custom';
  // Fonction qui reçoit les valeurs du formulaire et retourne un ReactNode
  render: (values: Record<string, unknown>) => React.ReactNode;
  // Liste des champs dont dépend ce composant (pour optimisation)
  dependencies?: string[];
} & BaseFormField;

export type FieldsetModelConfigField = {
  type: 'fieldset';
  properties: FormFieldsetProps;
  fields: ModelConfigField[];
} & BaseFormField;

export type ModelConfigField =
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
  fields: ModelConfigField[];
};

export type CommonAPIPayloadContext = {
  imageCount: number;
};

export type ModelConfig<
  EntryFormValues = Record<string, unknown>,
  OutputFormValues = Record<string, unknown>,
> = {
  fields: ModelConfigField[];
  buildAPIPayload?: (
    values: EntryFormValues,
    context: CommonAPIPayloadContext,
  ) => OutputFormValues;
};

export type ModelConfigWrapper<
  EntryFormValues = Record<string, unknown>,
  OutputFormValues = Record<string, unknown>,
> = {
  name: string;
  config: ModelConfig<EntryFormValues, OutputFormValues>;
};

export type ModelMetadata = {
  name: string;
  template: string;
  label: string;
  thumbnail: string;
  category?: string;
};
