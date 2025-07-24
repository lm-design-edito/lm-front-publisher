import type { FieldError } from 'react-hook-form';
import './style.css';
import { FormLabel } from '../form-label';
import { FormFieldError } from '../form-field-error';

export type FormInputProps = {
  className?: string;
  isValid?: boolean;
  error?: FieldError;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  children?: React.ReactNode;
};

export const FormInput = ({
  className = '',
  label,
  error,
  isValid,
  labelProps = {},
  inputProps,
  children,
}: FormInputProps) => {
  return (
    <div
      className={`${className} lmui-form form-input ${error ? 'form-input_error ' : ''}`}
    >
      <div className="lmui-form__input-wrapper">
        <input
          {...inputProps}
          className={`${inputProps.className || ''} lmui-form__input ${error ? 'lmui-form__input-error-state' : ''} ${isValid ? 'lmui-form__input-valid-state' : ''}`}
        />
        <FormLabel {...labelProps}>{label}</FormLabel>
      </div>
      {children}
      <FormFieldError error={error} />
    </div>
  );
};
