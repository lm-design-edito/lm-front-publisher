import './style.css';

export type HelperProps = {
  text?: string | React.ReactNode;
  size?: 'sm' | 'md';
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'right'
    | 'left';
  className?: string;
};

export const Helper = ({
  text,
  size = 'sm',
  position = 'top-left',
  className,
}: HelperProps) => {
  return (
    <span
      className={`helper helper--${position} helper--${size} ${className || ''}`}
    >
      <span className="helper__button">i</span>
      <span className="helper__text">{text}</span>
    </span>
  );
};
