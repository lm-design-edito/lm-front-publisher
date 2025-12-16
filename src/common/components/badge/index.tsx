import './style.css';

export type BadgeProps = {
  color?:
    | 'blue'
    | 'violet'
    | 'yellow'
    | 'sea'
    | 'grey'
    | 'green'
    | 'red'
    | 'orange'
    | string;
  size?: 's' | 'm' | 'l';
  children: React.ReactNode;
  className?: string;
};

export const Badge = ({
  children,
  color = 'blue',
  size = 's',
  className = '',
}: BadgeProps) => {
  return (
    <span
      className={`lmui-badge lmui-badge_secondary lmui-badge_${size} lmui-badge_${color} ${className}`}
    >
      {children}
    </span>
  );
};
