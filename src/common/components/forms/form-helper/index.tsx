import { Helper, type HelperProps } from '@common/components/helper';

export type FormHelperProps = HelperProps & {
  className?: string;
};

export const FormHelper = ({ className = '', ...otherProps }: HelperProps) => {
  return <Helper className={`form-helper ${className}`} {...otherProps} />;
};
