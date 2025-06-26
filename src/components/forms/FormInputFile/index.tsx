import { FieldSet } from "../Fieldset";
import { FormLabel } from "../FormLabel";
import { FormInput, type FormInputProps } from "../FormInput";
import { FormFieldError } from "../FormFieldError";

import './style.css'

export type FormInputFileProps = {
  className?: string;
  isValid?: boolean;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FormInputProps['error'];
  inputProps: FormInputProps['inputProps'];
}

export const FormInputFile = ({ label, labelProps, className, inputProps, error }: FormInputFileProps) => {
  return (
    <FieldSet
      className={`form-input-file ${className || ''} ${error ? 'form-input-file_error' : ''}`}
      contentClassName="form-input-file__content"
      legend={<FormLabel {...labelProps}>{label}</FormLabel>}
    >
      <FormInput
        inputProps={{
          type: "file",
          accept: "image/*",
          multiple: false,
          ...inputProps
        }}
      />
      <FormFieldError error={error} />
    </FieldSet>
  );
}
