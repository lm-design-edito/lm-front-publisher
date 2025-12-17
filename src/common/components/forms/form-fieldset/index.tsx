import { FormError, type FormErrorProps } from '../form-error';
import './style.css';

export type FormFieldsetProps = {
  className?: string;
  type?: 'solid' | 'transparent',
  legend?: string | React.ReactNode;
  contentClassName?: string;
  children?: React.ReactNode;
  error?: FormErrorProps['error'];
  additionalContent?: React.ReactNode;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const FormFieldset = ({
  className = '',
  type = 'solid',
  legend: _legend,
  contentClassName,
  children,
  additionalContent,
  error,
  ...props
}: FormFieldsetProps) => {
  return (
    <fieldset
      className={`form-fieldset form-fieldset_${type} ${className} ${error ? 'form-fieldset_error' : ''}`}
      {...props}
    >
      {_legend && <legend>{_legend}</legend>}
      <div className={contentClassName}>{children}</div>
      <FormError error={error} />
      {additionalContent}
    </fieldset>
  );
};
