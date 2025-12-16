import type React from 'react';
import type { HTMLAttributes } from 'react';
import './style.css';

type TextProps = {
  tag?: 'p' | 'span';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  align?: 'left' | 'right' | 'center';
  fontStyle?: 'normal' | 'italic';
  children?: React.ReactNode;
  className?: HTMLAttributes<HTMLElement>['className'];
};

const Text = ({
  children,
  tag = 'p',
  size = 'md',
  fontStyle = 'normal',
  align,
  className = '',
  ...otherProps
}: TextProps) => {
  const Tag = tag;

  const _className = `text text--${size} ${align ? `text--${align}` : ''} text--${fontStyle} ${className}`;

  return (
    <Tag className={_className} {...otherProps}>
      {children}
    </Tag>
  );
};

export { Text };
