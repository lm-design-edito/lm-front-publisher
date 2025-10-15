import { Icon } from '../icon';
import './style.css';

export type AlertProps = {
  id?: string;
  icon?: string;
  className?: string;
  message: string | React.ReactNode;
  type: 'info' | 'success' | 'error' | 'warning' | 'default';
  onClose?: () => void;
};

const getIcon = (icon: AlertProps['icon'], type: AlertProps['type']) => {
  if (icon) return icon;

  switch (type) {
    case 'error':
      return 'danger';
    case 'success':
      return 'check';
    case 'warning':
      return 'help';
    default:
      return 'info';
  }
};

export const Alert = ({
  message,
  id,
  type,
  icon,
  className,
  onClose,
}: AlertProps) => {
  return (
    <div
      key={id}
      className={`alert alert_${type} alert--${id} ${onClose ? 'alert_with-close' : ''} ${className || ''}`}
    >
      <Icon name={getIcon(icon, type)} className="alert__icon" />
      <span className="alert__message">{message}</span>
      {onClose && (
        <button className="alert__close" onClick={onClose} aria-label="Fermer">
          <Icon name="close" size="xs" />
        </button>
      )}
    </div>
  );
};
