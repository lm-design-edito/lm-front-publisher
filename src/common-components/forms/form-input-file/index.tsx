import { FieldSet } from '../fieldset';
import { FormLabel } from '../form-label';
import { FormInput, type FormInputProps } from '../form-input';
import { FormFieldError } from '../form-field-error';
import { Display } from '@common-components/display';

import './style.css';
import React, { useMemo, useState } from 'react';

export type FormInputFileProps = {
  className?: string;
  isValid?: boolean;
  label?: string;
  previewUrl?: string | null;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  error?: FormInputProps['error'];
  inputProps: FormInputProps['inputProps'];
  droppable?: boolean;
};

export const FormInputFile = ({
  label,
  labelProps,
  previewUrl,
  className,
  inputProps,
  error,
  ...props
}: FormInputFileProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const dragProps = useMemo(
    () =>
      props.droppable
        ? {
            droppable: 'true',
            onDragEnd: (e: React.DragEvent<HTMLFieldSetElement>) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingOver(false);
            },
            onDragOver: (e: React.DragEvent<HTMLFieldSetElement>) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingOver(true);
            },
            onDragLeave: (e: React.DragEvent<HTMLFieldSetElement>) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingOver(false);
            },
            onDrop: (e: React.DragEvent<HTMLFieldSetElement>) => {
              if (e.dataTransfer.files.length > 0) {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (inputProps.onChange) {
                  inputProps.onChange({
                    target: { files: [file] },
                  } as unknown as React.ChangeEvent<HTMLInputElement>);
                }
              }
              setIsDraggingOver(false);
            },
          }
        : {},
    [props.droppable, inputProps],
  );

  return (
    <FieldSet
      className={`form-input-file ${className || ''} ${isDraggingOver ? 'form-input-file_dragging-over' : ''} ${error ? 'form-input-file_error' : ''}`}
      contentClassName="form-input-file__content"
      legend={<FormLabel {...labelProps}>{label}</FormLabel>}
      {...props}
      {...dragProps}
    >
      <Display type="flex" direction="row" align="center">
        <FormInput
          inputProps={{
            type: 'file',
            accept: 'image/*',
            multiple: false,
            ...inputProps,
          }}
        >
          {props.droppable ? <span>Ou drag & drop un fichier</span> : null}
        </FormInput>
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
    </FieldSet>
  );
};
