import { Button, type ButtonProps } from '../../buttons/button';

export type FormSubmitProps = {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
} & ButtonProps;

export const FormSubmit = ({
  children,
  className = '',
  ...props
}: FormSubmitProps) => {
  return (
    <Button type="submit" className={className} size="m" {...props}>
      {children}
    </Button>
  );
};
