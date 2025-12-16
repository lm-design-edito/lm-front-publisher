import type { FieldError } from 'react-hook-form';
import { FormLabel } from '../form-label';
import { FormError } from '../form-error';

import { FormHelper, type FormHelperProps } from '../form-helper';
import { Display } from '@common/components/display';
import { Badge } from '@common/components/badge';

import './style.css';

export type FormInputRangeProps = {
  className?: string;
  isValid?: boolean;
  error?: FieldError;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  formattedValue?: (value: number) => string;
  helperProps?: FormHelperProps;
  children?: React.ReactNode;
};

export const FormInputRange = ({
  className = '',
  label,
  error,
  isValid,
  labelProps = {},
  inputProps,
  helperProps,
  formattedValue,
  children,
}: FormInputRangeProps) => {
  const formattedVal = formattedValue
    ? formattedValue(Number(inputProps.value) || 0)
    : null;

  return (
    <div
      className={`${className} lmui-form form-input form-input-range ${error ? 'form-input_error ' : ''}`}
    >
      <Display type="flex" direction="row" align="center" gap="1">
        <div className="lm-publisher-w-100">
          <div className="lmui-form__input-wrapper">
            <span className="form-input-range__min-value">
              {inputProps.min}
            </span>
            <input
              {...inputProps}
              className={`${inputProps.className || ''} lmui-form__input ${error ? 'lmui-form__input-error-state' : ''} ${isValid ? 'lmui-form__input-valid-state' : ''}`}
            />
            <FormLabel {...labelProps}>
              {label} {formattedVal !== null && <Badge>{formattedVal}</Badge>}
              {helperProps && <FormHelper {...helperProps} />}
            </FormLabel>
            <span className="form-input-range__max-value">
              {inputProps.max}
            </span>
          </div>
          {children}
          <FormError error={error} />
        </div>
      </Display>
    </div>
  );
};
