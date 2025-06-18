import Button from "../../buttons/Button";
import Loader from "../../Loader";

type FormSubmitProps = {
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const FormSubmit = ({ isLoading, children, className, ...props }: FormSubmitProps) => {
  return (
    <Button type="submit" className={className} size="m" {...props}>
      {children} {isLoading ? <Loader />: <></>}
    </Button>
  );
}

export default FormSubmit