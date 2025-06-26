import { FieldSet } from '../fieldset';
import { FormLabel } from '../form-label';
import { FormInput, type FormInputProps } from '../form-input';
import { FormFieldError } from '../form-field-error';

import './style.css';

export type FormInputFileProps = {
  className?: string;
  isValid?: boolean;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FormInputProps['error'];
  inputProps: FormInputProps['inputProps'];
};

export const FormInputFile = ({
  label,
  labelProps,
  className,
  inputProps,
  error,
}: FormInputFileProps) => {
  return (
    <FieldSet
      className={`form-input-file ${className || ''} ${error ? 'form-input-file_error' : ''}`}
      contentClassName="form-input-file__content"
      legend={<FormLabel {...labelProps}>{label}</FormLabel>}
    >
      <FormInput
        inputProps={{
          type: 'file',
          accept: 'image/*',
          multiple: false,
          ...inputProps,
        }}
      />
      <FormFieldError error={error} />
    </FieldSet>
  );
};
