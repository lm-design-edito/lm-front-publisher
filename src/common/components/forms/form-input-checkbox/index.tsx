import { FormLabel } from '../form-label';
import { FormFieldError, type FormFieldErrorProps } from '../form-field-error';

export type FormInputCheckboxProps = {
  className?: string;
  label: string;
  error?: FormFieldErrorProps['error'];
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const FormInputCheckbox = ({
  className = '',
  error,
  label,
  labelProps,
  inputProps,
}: FormInputCheckboxProps) => {
  return (
    <div
      className={`lmui-checkbox ${className} ${error ? 'lmui-checkbox_error' : ''} `}
    >
      <input className="lmui-checkbox__input" type="checkbox" {...inputProps} />
      <FormLabel
        className={`lmui-checkbox__fake ${labelProps?.className || ''}`}
        {...labelProps}
      >
        {label}
      </FormLabel>
      <FormFieldError error={error} />
    </div>
  );
};

export { FormInputCheckbox };
