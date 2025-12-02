import { Form as FormRoot } from './form';
import { FormInput } from './form-input';
import { FormInputCheckbox } from './form-input-checkbox';
import { FormInputRadioGroup } from './form-input-radio-group';
import { FormFieldset } from './form-fieldset';
import { FormSubmit } from './form-submit';
import { FormHelper } from './form-helper';
import { FormFooter } from './form-footer';
import { FormError } from './form-error';
import { FormInputFile } from './form-input-file';
import { FormInputCheckboxGroup } from './form-input-checkbox-group';
import { FormInputRadio } from './form-input-radio';
import { FormSelect } from './form-select';

export const Form = Object.assign(FormRoot, {
  Input: FormInput,
  InputFile: FormInputFile,
  Checkbox: FormInputCheckbox,
  CheckboxGroup: FormInputCheckboxGroup,
  Radio: FormInputRadio,
  RadioGroup: FormInputRadioGroup,
  Select: FormSelect,
  Fieldset: FormFieldset,
  Submit: FormSubmit,
  Helper: FormHelper,
  Footer: FormFooter,
  Error: FormError,
});

export type { FormFieldsetProps } from './form-fieldset';
export type { FormErrorType } from './form-error';
export type { FormInputProps } from './form-input';
export type { FormInputFileProps } from './form-input-file';
export type { FormInputCheckboxProps } from './form-input-checkbox';
export type { FormInputCheckboxGroupProps } from './form-input-checkbox-group';
export type { FormInputRadioProps } from './form-input-radio';
export type { FormInputRadioGroupProps } from './form-input-radio-group';
export type { FormSelectProps } from './form-select';
export type { FormHelperProps } from './form-helper';
export type { FormSubmitProps } from './form-submit';
export type { FormFooterProps } from './form-footer';
