import { Icon } from '../icon';
import './style.css';

export type Props = {
  className?: string;
  children?: React.ReactNode;
  icon?: string;
  size?: 's' | 'm' | 'l';
  display?: 'flex' | 'inline-flex';
};

export const CircleBadge = ({
  className,
  size = 'm',
  display = 'flex',
  icon,
  children,
}: Props) => {
  return (
    <span
      className={`circle-badge circle-badge_${size} circle-badge_${display} ${className}`}
    >
      {icon && <Icon name={icon} color="forced-white" />}
      {children}
    </span>
  );
};
