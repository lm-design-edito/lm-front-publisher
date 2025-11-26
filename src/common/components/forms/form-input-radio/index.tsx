import type { FieldError } from 'react-hook-form';
import { FormLabel } from '../form-label';
import { FormFieldError } from '../form-field-error';
import { FormHelper, type FormHelperProps } from '../form-helper';

import './style.css';
import { Display } from '@common/components/display';

export type FormInputRadioProps = {
  className?: string;
  label: string;
  error?: FieldError;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  helperProps?: FormHelperProps;
};

const FormInputRadio = ({
  className = '',
  error,
  label,
  labelProps,
  inputProps,
  helperProps,
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
        <Display type="inline-flex" align="center" gap={1} wrap>
          {label}
          {helperProps && <FormHelper {...helperProps} />}
        </Display>
      </FormLabel>
      <FormFieldError error={error} />
    </div>
  );
};

export { FormInputRadio };
