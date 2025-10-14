import { Display } from '@common/components/display';
import { FormFieldError, type FormFieldErrorProps } from '../form-field-error';
import { FormHelper, type FormHelperProps } from '../form-helper';
import './style.css';
import { FormLabel } from '../form-label';

export type SelectProps = {
  options: FormSelectProps['options'];
  selectProps?: FormSelectProps['selectProps'];
};

const Select = ({ options, selectProps }: SelectProps) => {
  return (
    <select
      className="form-select lmui-select lmui-select__input"
      {...selectProps}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export type FormSelectProps = {
  className?: string;
  label?: string;
  options: { value: string; label: string }[];
  error?: FormFieldErrorProps['error'];
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  helper?: FormHelperProps;
};

export const FormSelect = ({
  label,
  options,
  error,
  selectProps,
  helper,
  ...props
}: FormSelectProps) => {
  if (label) {
    return (
      <Display type="flex" direction="column" gap="1" {...props}>
        {label && <FormLabel> {label}</FormLabel>}
        <Display type="flex" align="center" flex="1">
          <Select options={options} selectProps={selectProps} />
          {helper && <FormHelper {...helper} />}
        </Display>
        <FormFieldError error={error} />
      </Display>
    );
  }
  return (
    <Display type="flex" align="center" flex="1" {...props}>
      <Select options={options} selectProps={selectProps} />
      {helper && <FormHelper {...helper} />}
    </Display>
  );
};
