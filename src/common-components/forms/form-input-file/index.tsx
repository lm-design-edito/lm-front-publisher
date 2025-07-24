import { FieldSet } from '../fieldset';
import { FormLabel } from '../form-label';
import { FormInput, type FormInputProps } from '../form-input';
import { FormFieldError } from '../form-field-error';
import { Display } from '@common-components/display';

import './style.css';

export type FormInputFileProps = {
  className?: string;
  isValid?: boolean;
  label?: string;
  previewUrl?: string | null;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FormInputProps['error'];
  inputProps: FormInputProps['inputProps'];
};

export const FormInputFile = ({
  label,
  labelProps,
  previewUrl,
  className,
  inputProps,
  error,
}: FormInputFileProps) => {
  return (
    <FieldSet
      className={`form-input-file ${className || ''} ${error ? 'form-input-file_error' : ''}`}
      contentClassName="form-input-file__content"
      legend={<FormLabel {...labelProps}>{label}</FormLabel>}
    >
      <Display type="flex" direction="row" align="center">
        <FormInput
          inputProps={{
            type: 'file',
            accept: 'image/*',
            multiple: false,
            ...inputProps,
          }}
        />
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="form-input-file__preview-link"
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="form-input-file__preview"
            />
          </a>
        )}
      </Display>
      <FormFieldError error={error} />
    </FieldSet >
  );
};
