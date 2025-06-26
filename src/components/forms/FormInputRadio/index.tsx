import type { FieldError } from 'react-hook-form';
import { FormLabel } from '../FormLabel';
import { FormFieldError } from '../FormFieldError';

export type FormInputRadioProps = {
  className?: string;
  label: string;
  error?: FieldError;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const FormInputRadio = ({
  className = '',
  error,
  label,
  labelProps,
  inputProps,
}: FormInputRadioProps) => {
  return (
    <div
      className={`lmui-radio ${className} ${error ? 'lmui-radio_error' : ''} `}
    >
      <input className="lmui-radio__input" type="radio" {...inputProps} />
      <FormLabel
        className={`lmui-radio__fake ${labelProps?.className || ''}`}
        {...labelProps}
      >
        {label || 'Label optionnel'}
      </FormLabel>
      <FormFieldError error={error} />
    </div>
  );
};

export { FormInputRadio };
