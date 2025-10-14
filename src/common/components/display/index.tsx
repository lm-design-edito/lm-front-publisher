import { createDisplayClassNames } from './utils';
import './style.css';

export type DisplayGridProps = {
  type: 'grid';
  cols?: number;
  gap?: number | string;
};

export type DisplayFlexProps = {
  type: 'flex';
  gap?: number | string;
  flex?: number | string;
  direction?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
  align?: 'start' | 'end' | 'center' | 'stretch';
  wrap?: boolean;
};

export type DisplayProps = {
  className?: string;
  children: React.ReactNode;
} & (DisplayGridProps | DisplayFlexProps);

export const Display = (props: DisplayProps) => {
  const classNames = createDisplayClassNames(props);
  return (
    <div className={`${classNames} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};
