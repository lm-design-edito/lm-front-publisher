import './style.css'

type FormFooterProps = {
    children?: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FormFooter = ({children, className, ...props}: FormFooterProps) => {
  return (
    <div className={`form__footer ${className || ''}`} {...props}>
      {children}
    </div>
  );
}

export default FormFooter