import './style.css';

type FormFieldError = {
  message?: string;
  type?: string;
};
export type FormFieldErrorProps = {
  error?: FormFieldError | FormFieldError[];
};

const FormFieldError = ({ error }: FormFieldErrorProps) => {
  const errors = (Array.isArray(error) ? error : [error]).filter(
    err => err !== undefined,
  );
  const hasError = errors.length > 0;

  return (
    <span
      className={`form-field-error lmui-form__error-message ${hasError ? 'form-field-error_visible form-field-error_active' : ''}`}
    >
      {hasError ? errors.map(err => err.message).join(' ') : ''}
    </span>
  );
};

export { FormFieldError };
