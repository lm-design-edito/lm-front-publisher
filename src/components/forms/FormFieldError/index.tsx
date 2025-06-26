import type { FieldError } from "react-hook-form";
import './style.css';

type FormFieldErrorProps = {
    error?: FieldError;
}

const FormFieldError = ({ error }: FormFieldErrorProps) => {
    const hasError = error && error.message && error.type;

    return (
        <span className={`form-field-error lmui-form__error-message ${hasError ? "form-field-error_visible form-field-error_active" : ""}`} >
            {hasError ? error.message : ""}
        </span>
    );
}

export {
    FormFieldError
}