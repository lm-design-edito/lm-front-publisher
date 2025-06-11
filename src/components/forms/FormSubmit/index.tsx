import Loader from "../../Loader";

type FormSubmitProps = {
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const FormSubmit = ({ isLoading, children, className, ...props }: FormSubmitProps) => {
  return (
    <button type="submit" className={`lmui-button lmui-button_m ${className || ''}`} {...props}>{children} {isLoading ? <Loader />: <></>}</button>
  );
}

export default FormSubmit