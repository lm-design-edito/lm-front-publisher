import { Loader } from '../../loader';
import './style.css';

export type DefaultProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  color?: 'danger' | 'success' | 'warning' | 'info' | 'default';
  size?: 's' | 'm' | 'l';
  className?: string;
  isLoading?: boolean;
};

export type ButtonProps = DefaultProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const getVariantClass = (variant?: string) =>
  variant ? `lmui-button_${variant}` : 'lmui-button_primary';
const getSizeClass = (size?: string) =>
  size ? `lmui-button_${size}` : 'lmui-button_m';
const getColorClass = (color?: string) => (color ? `lmui-button_${color}` : '');

export const Button = ({
  size,
  variant,
  color,
  className = '',
  children,
  isLoading,
  ...props
}: ButtonProps) => {
  const variantClass = getVariantClass(variant);
  const sizeClass = getSizeClass(size);
  const colorClass = getColorClass(color);

  return (
    <button
      {...props}
      className={`lmui-button ${variantClass} ${sizeClass} ${colorClass} ${className}`}
    >
      {children}
      {isLoading && <Loader />}
    </button>
  );
};

export const FakeButton = ({
  variant,
  size,
  color,
  className = '',
  children,
}: DefaultProps) => {
  const variantClass = getVariantClass(variant);
  const sizeClass = getSizeClass(size);
  const colorClass = getColorClass(color);

  return (
    <span
      className={`lmui-button lmui-button-span ${variantClass} ${sizeClass} ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
};
