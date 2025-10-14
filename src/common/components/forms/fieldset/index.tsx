import './style.css';

export type FieldsetProps = {
  className?: string;
  legend?: string | React.ReactNode;
  contentClassName?: string;
  children?: React.ReactNode;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const FieldSet = ({
  className = '',
  legend: _legend,
  contentClassName,
  children,
  ...props
}: FieldsetProps) => {
  return (
    <fieldset className={className} {...props}>
      {_legend && <legend>{_legend}</legend>}
      <div className={contentClassName}>{children}</div>
    </fieldset>
  );
};
