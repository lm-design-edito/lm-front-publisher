import './style.css';

export type FormHelperProps = {
  text?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left';
};

export const FormHelper = ({
  text,
  position = 'top-left',
}: FormHelperProps) => {
  return (
    <span className={`form-helper form-helper--${position}`}>
      <span className="form-helper__button">i</span>
      <span className="form-helper__text">{text}</span>
    </span>
  );
};
