import type { FieldError } from "react-hook-form";
import './style.css'
import { FormLabel }from "../FormLabel";

export type FormInputProps = {
    className?: string;
    isValid?: boolean;
    error?: FieldError;
    label?: string;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export const FormInput = ({ className = '', label, error, isValid, labelProps = {}, inputProps }: FormInputProps) => {
  return (
    <div className={`${className} lmui-form form__input ${error ? "form__input--error " : ""}`}>
      <div className="lmui-form__input-wrapper">
        <input {...inputProps } className={`${inputProps.className || ''} lmui-form__input ${error ? 'lmui-form__input-error-state': ''} ${isValid ? 'lmui-form__input-valid-state': ''}`}/> 
        <FormLabel {...labelProps}>{label}</FormLabel>
      </div>
      <span className="form__error lmui-form__error-message lmui-form__error-visible">
          {error ? error.message : ""}
      </span>
    </div>
  );
}