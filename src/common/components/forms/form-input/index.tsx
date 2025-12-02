import type { FieldError } from 'react-hook-form';
import { FormLabel } from '../form-label';
import { FormError } from '../form-error';

import './style.css';
import { FormHelper, type FormHelperProps } from '../form-helper';
import { Display } from '@common/components/display';

export type FormInputProps = {
  className?: string;
  isValid?: boolean;
  error?: FieldError;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  helperProps?: FormHelperProps;
  children?: React.ReactNode;
};

export const FormInput = ({
  className = '',
  label,
  error,
  isValid,
  labelProps = {},
  inputProps,
  helperProps,
  children,
}: FormInputProps) => {
  return (
    <div
      className={`${className} lmui-form form-input ${error ? 'form-input_error ' : ''}`}
    >
      <Display type="flex" direction="row" align="center" gap="1">
        <div className="lm-publisher-w-100">
          <div className="lmui-form__input-wrapper">
            <input
              {...inputProps}
              className={`${inputProps.className || ''} lmui-form__input ${error ? 'lmui-form__input-error-state' : ''} ${isValid ? 'lmui-form__input-valid-state' : ''}`}
            />
            <FormLabel {...labelProps}>{label}</FormLabel>
          </div>
          {children}
          <FormError error={error} />
        </div>
        {helperProps && <FormHelper {...helperProps} />}
      </Display>
    </div>
  );
};
