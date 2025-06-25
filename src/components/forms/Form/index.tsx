import './style.css'

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    children?: React.ReactNode;
};

export const Form = ({children, ...props}: FormProps) => {
  return (
    <form {...props} className={`form ${props.className || ''}`}>
        {children}
    </form>
  );
}