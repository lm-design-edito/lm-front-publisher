export type DividerProps = {
  size?: 's' | 'm' | 'l';
  variant?: 'solid' | 'dashed';
};
import './style.css';

export const Divider = ({ size = 's', variant = 'solid' }: DividerProps) => {
  return (
    <hr
      className={`lmui-divider lmui-divider_${size} lmui-divider_${variant}`}
    />
  );
};
