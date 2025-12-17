export type DividerProps = {
  size?: 's' | 'm' | 'l';
  position?: 'left' | 'center' | 'right';
  variant?: 'solid' | 'dashed';
  spaceSize?: 's' | 'm' | 'l';
};
import './style.css';

export const Divider = ({
  size = 's',
  spaceSize = 'l',
  position = 'center',
  variant = 'solid',
}: DividerProps) => {
  return (
    <hr
      className={`lmui-divider lmui-divider_${size} lmui-divider_${variant} lmui-divider_space-${spaceSize} lmui-divider_position-${position}`}
    />
  );
};
