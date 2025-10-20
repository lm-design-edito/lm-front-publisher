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
};

export const Badge = ({ children, color = 'blue', size = 's' }: BadgeProps) => {
  return (
    <span
      className={`lmui-badge lmui-badge_secondary lmui-badge_${size} lmui-badge_${color}`}
    >
      {children}
    </span>
  );
};
