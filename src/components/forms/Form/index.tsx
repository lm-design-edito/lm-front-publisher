import './style.css'
type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    children?: React.ReactNode;
};

const Form = ({children, ...props}: FormProps) => {
  return (
    <form {...props} className={`form ${props.className || ''}`}>
        {children}
    </form>
  );
}

export default Form