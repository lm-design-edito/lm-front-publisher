import type { FieldError } from "react-hook-form";
import './style.css'
import FormLabel from "../FormLabel";

type FormInputProps = {
    className?: string;
    error?: FieldError;
    label?: string;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

const FormInput = ({ className, label, error, labelProps = {}, inputProps }: FormInputProps) => {
  return (
    <div className={`${className || ''} form__input ${error ? "form__input--error" : ""}`}>
        <FormLabel {...labelProps}>{label}</FormLabel>
        <input {...inputProps } /> 
        <span className="form__error">
            {error ? error.message : ""}
        </span>
    </div>
  );
}

export default FormInput