import './style.css';

export type FormHelperProps = {
  text?: string;
  size?: 'sm' | 'md';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left';
};

export const FormHelper = ({
  text,
  size = 'sm',
  position = 'top-left',
}: FormHelperProps) => {
  return (
    <span
      className={`form-helper form-helper--${position} form-helper--${size}`}
    >
      <span className="form-helper__button">i</span>
      <span className="form-helper__text">{text}</span>
    </span>
  );
};
