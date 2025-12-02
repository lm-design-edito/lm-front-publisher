import './style.css';

export type HelperProps = {
  text?: string;
  size?: 'sm' | 'md';
  textSize?: 'sm' | 'md';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left';
  className?: string;
};

export const Helper = ({
  text,
  size = 'sm',
  textSize = 'sm',
  position = 'top-left',
  className,
}: HelperProps) => {
  return (
    <span
      className={`helper helper--${position} helper--${size} helper--text-${textSize} ${className || ''}`}
    >
      <span className="helper__button">i</span>
      <span className="helper__text">{text}</span>
    </span>
  );
};
