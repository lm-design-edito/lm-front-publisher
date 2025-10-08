import './style.css';

export type FormFieldHelperProps = {
  message?: string;
};

const FormFieldHelper = ({ message }: FormFieldHelperProps) => {
  return <span className={`form-field-helper`}>{message}</span>;
};

export { FormFieldHelper };
