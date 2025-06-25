import './style.css'

export type FormFooterProps = {
    children?: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const FormFooter = ({children, className = '', ...props}: FormFooterProps) => {
  return (
    <div className={`form__footer ${className}`} {...props}>
      {children}
    </div>
  );
}
