import './style.css';

export type FormErrorType = {
  message?: string;
  type?: string;
};
export type FormErrorProps = {
  error?: FormErrorType | FormErrorType[];
};

export const FormError = ({ error }: FormErrorProps) => {
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
