import { FieldSet } from '../Fieldset';
import { FormFieldError } from '../FormFieldError';
import { FormInputRadio, type FormInputRadioProps } from '../FormInputRadio';

import './style.css';

export type FormInputRadioGroupProps = {
  className?: string;
  isValid?: boolean;
  label?: string;
  labelClassName?: string;
  error?: FormInputRadioProps['error'];
  inputGroupProps: ({
    id?: string;
  } & FormInputRadioProps)[];
};

export const FormInputRadioGroup = ({
  label,
  labelClassName = '',
  className = '',
  inputGroupProps,
  error,
}: FormInputRadioGroupProps) => {
  console.log('FormInputRadioGroup', {
    label,
    labelClassName,
    className,
    inputGroupProps,
    error,
  });
  return (
    <FieldSet
      className={`form-input-radio-group ${className || ''} ${error ? 'form-input-radio-group_error' : ''}`}
      contentClassName="form-input-radio-group__content"
      legend={<span className={labelClassName}>{label}</span>}
    >
      <div className="form-input-radio-group__inputs">
        {inputGroupProps.map(({ id, ...inputProps }, index) => (
          <FormInputRadio key={id || `input-${index}`} {...inputProps} />
        ))}
      </div>
      <FormFieldError error={error} />
    </FieldSet>
  );
};
