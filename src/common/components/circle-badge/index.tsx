import { Icon } from '../icon';
import './style.css';

export type Props = {
  className?: string;
  children?: React.ReactNode;
  icon?: string;
};

export const CircleBadge = ({ className, icon, children }: Props) => {
  return (
    <span className={`circle-badge ${className}`}>
      {icon && <Icon name={icon} color="forced-white" />}
      {children}
    </span>
  );
};
