export type LabelProps = {
  children?: React.ReactNode;
  className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export const FormLabel = ({
  children,
  className = '',
  ...props
}: LabelProps) => {
  if (!children) {
    return null;
  }

  return (
    <label
      className={`${className} lmui-form__placeholder form-label`}
      {...props}
    >
      {children}
    </label>
  );
};
