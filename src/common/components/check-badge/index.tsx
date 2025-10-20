import { Icon } from '../icon';
import './style.css';

export type Props = {
  className?: string;
};

export const CheckBadge = ({ className }: Props) => {
  return (
    <span className={`check-badge ${className}`}>
      <Icon name={'check'} color="forced-white" />
    </span>
  );
};
