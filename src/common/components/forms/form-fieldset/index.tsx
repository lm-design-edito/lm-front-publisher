import './style.css';
import { FormError, type FormErrorProps } from '../form-error';

export type FormFieldsetProps = {
  className?: string;
  legend?: string | React.ReactNode;
  contentClassName?: string;
  children?: React.ReactNode;
  error?: FormErrorProps['error'];
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
      <FormError error={error} />
      {additionalContent}
    </fieldset>
  );
};
