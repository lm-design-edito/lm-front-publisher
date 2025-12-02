import { FormFieldset } from '../form-fieldset';
import { FormLabel } from '../form-label';
import { FormInput, type FormInputProps } from '../form-input';
import { FormFieldError } from '../form-field-error';
import { Display } from '@common/components/display';

import './style.css';
import React from 'react';
import { FakeButton } from '@common/components/buttons/button';
import useFileDragDrop from '@common/hooks/useFileDragDrop';

export type FormInputFileProps = {
  className?: string;
  isValid?: boolean;
  label?: string;
  selectLabel?: string;
  preview?: {
    url?: string | null;
    name?: string;
  };
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FormInputProps['error'];
  inputProps: FormInputProps['inputProps'];
  droppable?: boolean;
};

export const FormInputFile = ({
  label,
  labelProps,
  selectLabel,
  className,
  inputProps,
  error,
  preview,
  ...props
}: FormInputFileProps) => {
  const { isDraggingOver, dragProps } = useFileDragDrop({
    droppable: props.droppable,
    onDrop: (files: FileList) => {
      const file = files[0];
      if (inputProps.onChange) {
        inputProps.onChange({
          target: { ...inputProps, files: [file], value: file.name },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    },
  });

  return (
    <FormFieldset
      className={`form-input-file ${className || ''} ${isDraggingOver ? 'form-input-file_dragging-over' : ''} ${error ? 'form-input-file_error' : ''}`}
      contentClassName="form-input-file__content"
      legend={<FormLabel {...labelProps}>{label}</FormLabel>}
      {...props}
      {...dragProps}
    >
      <Display type="flex" direction="row" align="center">
        <label htmlFor="imageValue">
          <FakeButton variant="secondary" size="s">
            {selectLabel || 'Sélectionner une image'}
          </FakeButton>
          <FormInput
            className="form-input-file__input"
            inputProps={{
              ...inputProps,
              id: 'imageValue',
              type: 'file',
              accept: 'image/*',
            }}
          />
        </label>
        {preview && preview.url && (
          <a
            href={preview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="form-input-file__preview-link"
          >
            <img
              src={preview.url}
              alt="Preview"
              className="form-input-file__preview"
            />
          </a>
        )}
        {preview && preview.name && (
          <span className="form-input-file__file-name">{preview.name}</span>
        )}
      </Display>
      <FormFieldError error={error} />
    </FormFieldset>
  );
};
