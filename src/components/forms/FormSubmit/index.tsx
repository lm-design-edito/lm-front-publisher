import Button from "../../buttons/Button";

type FormSubmitProps = {
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const FormSubmit = ({ children, className, ...props }: FormSubmitProps) => {
  return (
    <Button type="submit" className={className} size="m" {...props}>{children}</Button>
  );
}

export default FormSubmit