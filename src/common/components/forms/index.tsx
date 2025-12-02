import { Form as FormRoot } from './form';
import { FormInput } from './form-input';
import { FormInputCheckbox } from './form-input-checkbox';
import { FormInputRadioGroup } from './form-input-radio-group';
import { FormFieldset } from './form-fieldset';
import { FormSubmit } from './form-submit';
import { FormHelper } from './form-helper';
import { FormFooter } from './form-footer';
import { FormFieldError } from './form-field-error';

export const Form = Object.assign(FormRoot, {
  Input: FormInput,
  Checkbox: FormInputCheckbox,
  RadioGroup: FormInputRadioGroup,
  Fieldset: FormFieldset,
  Submit: FormSubmit,
  Helper: FormHelper,
  Footer: FormFooter,
  Error: FormFieldError,
});

export type { FormFieldError as FormFieldErrorType } from './form-field-error';
export type { FormFieldsetProps } from './form-fieldset';
export type { FormInputProps } from './form-input';
export type { FormInputCheckboxProps } from './form-input-checkbox';
export type { FormInputRadioGroupProps } from './form-input-radio-group';
export type { FormSubmitProps } from './form-submit';
export type { FormHelperProps } from './form-helper';
export type { FormFooterProps } from './form-footer';
