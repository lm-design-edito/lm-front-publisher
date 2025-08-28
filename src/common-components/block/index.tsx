import { Display, type DisplayProps } from '@common-components/display';
import './style.css';

type BlockProps = DisplayProps & {
  size?: 's' | 'm' | 'l';
  children?: React.ReactNode;
};

export const Block = ({ size = 's', ...props }: BlockProps) => {
  const className = `lmui-block ${props.className || ''} lmui-block_${size}`;
  return <Display className={className} {...props} />;
};
