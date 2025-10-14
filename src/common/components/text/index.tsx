import type React from 'react';
import type { HTMLAttributes } from 'react';
import './style.css';

type TextProps = {
  tag?: 'p' | 'span';
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'right' | 'center';
  children?: React.ReactNode;
  className?: HTMLAttributes<HTMLElement>['className'];
};

const Text = ({
  children,
  tag = 'p',
  size = 'md',
  align,
  className,
  ...otherProps
}: TextProps) => {
  const Tag = tag;

  const _className = `text text--${size} ${align ? `text--${align}` : ''} ${className}`;

  return (
    <Tag className={_className} {...otherProps}>
      {children}
    </Tag>
  );
};

export { Text };
