import './style.css';
import { FormFieldError, type FormFieldErrorProps } from '../form-field-error';

export type FormFieldsetProps = {
  className?: string;
  legend?: string | React.ReactNode;
  contentClassName?: string;
  children?: React.ReactNode;
  error?: FormFieldErrorProps['error'];
  additionalContent?: React.ReactNode;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const FormFieldset = ({
  className = '',
  legend: _legend,
  contentClassName,
  children,
  additionalContent,
  error,
  ...props
}: FormFieldsetProps) => {
  return (
    <fieldset
      className={`form-fieldset ${className} ${error ? 'form-fieldset_error' : ''}`}
      {...props}
    >
      {_legend && <legend>{_legend}</legend>}
      <div className={contentClassName}>{children}</div>
      <FormFieldError error={error} />
      {additionalContent}
    </fieldset>
  );
};
