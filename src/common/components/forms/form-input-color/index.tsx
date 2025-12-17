import type { FieldError } from 'react-hook-form';
import { FormLabel } from '../form-label';
import { FormError } from '../form-error';

import { FormHelper, type FormHelperProps } from '../form-helper';
import { Display } from '@common/components/display';
import './style.css';
import { useCallback } from 'react';

export type FormInputColorProps = {
  className?: string;
  isValid?: boolean;
  error?: FieldError;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;
  helperProps?: FormHelperProps;
  children?: React.ReactNode;
};

export const FormInputColor = ({
  className = '',
  label,
  error,
  isValid,
  labelProps = {},
  inputProps,
  helperProps,
  children,
}: FormInputColorProps) => {
  const colorPickerId = `${inputProps.name || ''}-color-picker`;

  const triggerEvent = useCallback(
    (value: string | undefined) => {
      const syntheticEvent = {
        target: { value, name: inputProps.name },
      } as React.ChangeEvent<HTMLInputElement>;

      if (inputProps.onChange) {
        inputProps.onChange(syntheticEvent);
      }
    },
    [inputProps],
  );

  const formatHexColor = useCallback((color: string) => {
    if (!color) {
      return undefined;
    }

    color = color.toUpperCase();
    if (!color.startsWith('#')) {
      return `#${color}`;
    }
    return color;
  }, []);

  const onPickColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const hexColor = e.target.value;

      triggerEvent(formatHexColor(hexColor));
    },
    [triggerEvent, formatHexColor],
  );

  return (
    <div
      className={`${className} lmui-form form-input form-input-color ${error ? 'form-input_error ' : ''}`}
    >
      <Display type="flex" direction="row" align="center" gap="1">
        <div className="lm-publisher-w-100">
          <div className="lmui-form__input-wrapper">
            <label
              className="form-input-color__picker-wrapper"
              htmlFor={colorPickerId}
            >
              <input
                type="color"
                id={colorPickerId}
                value={inputProps.value as string}
                onChange={onPickColor}
                required={false}
                className="form-input-color__picker"
              />
              <div
                className="form-input-color__preview"
                style={
                  {
                    '--background-color': inputProps.value || '#000000',
                  } as React.CSSProperties
                }
              />
            </label>
            <input
              {...inputProps}
              onChange={e => {
                triggerEvent(formatHexColor(e.target.value));
              }}
              type="text"
              maxLength={7}
              pattern="^#[0-9A-Fa-f]{6}$"
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
