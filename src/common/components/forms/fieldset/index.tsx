import './style.css';
import { FormFieldError, type FormFieldErrorProps } from '../form-field-error';

export type FieldsetProps = {
  className?: string;
  legend?: string | React.ReactNode;
  contentClassName?: string;
  children?: React.ReactNode;
  error?: FormFieldErrorProps['error'];
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const FieldSet = ({
  className = '',
  legend: _legend,
  contentClassName,
  children,
  error,
  ...props
}: FieldsetProps) => {
  return (
    <fieldset
      className={`form-fieldset ${className} ${error ? 'form-fieldset_error' : ''}`}
      {...props}
    >
      {_legend && <legend>{_legend}</legend>}
      <div className={contentClassName}>{children}</div>
      <FormFieldError error={error} />
    </fieldset>
  );
};
