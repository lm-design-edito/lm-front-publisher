import { FieldSet } from '../fieldset';
import { FormFieldError } from '../form-field-error';
import {
  FormInputCheckbox,
  type FormInputCheckboxProps,
} from '../form-input-checkbox';

import './style.css';

export type FormInputCheckboxGroupProps = {
  className?: string;
  isValid?: boolean;
  label?: string;
  labelClassName?: string;
  error?: FormInputCheckboxProps['error'];
  inputGroupProps: ({
    id?: string;
  } & FormInputCheckboxProps)[];
  children?: React.ReactNode;
};

export const FormInputCheckboxGroup = ({
  label,
  labelClassName = '',
  className = '',
  inputGroupProps,
  children,
  error,
}: FormInputCheckboxGroupProps) => {
  return (
    <FieldSet
      className={`form-input-checkbox-group ${className || ''} ${error ? 'form-input-checkbox-group_error' : ''}`}
      contentClassName="form-input-checkbox-group__content"
      legend={<span className={labelClassName}>{label}</span>}
    >
      <div className="form-input-checkbox-group__inputs">
        {inputGroupProps.map(({ id, ...inputProps }, index) => (
          <FormInputCheckbox key={id || `input-${index}`} {...inputProps} />
        ))}
      </div>
      {children}
      <FormFieldError error={error} />
    </FieldSet>
  );
};
