import { FieldSet } from '../fieldset';
import { FormInputRadio, type FormInputRadioProps } from '../form-input-radio';

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
  return (
    <FieldSet
      className={`form-input-radio-group ${className || ''}`}
      contentClassName="form-input-radio-group__content"
      legend={<span className={labelClassName}>{label}</span>}
      {...(error && { error })}
    >
      <div className="form-input-radio-group__inputs">
        {inputGroupProps.map(({ id, ...inputProps }, index) => (
          <FormInputRadio key={id || `input-${index}`} {...inputProps} />
        ))}
      </div>
    </FieldSet>
  );
};
