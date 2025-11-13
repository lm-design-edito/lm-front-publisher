import {
  FormInput,
  type FormInputProps,
} from '@common/components/forms/form-input';
import { Icon } from '@common/components/icon';
import useFileDragDrop from '@common/hooks/useFileDragDrop';
import './style.css';
import { useMemo } from 'react';

export type ImageInputFieldProps = {
  className?: string;
  error?: FormInputProps['error'];
  inputProps: FormInputProps['inputProps'];
  droppable?: boolean;
};

const INPUT_ACCEPT = 'image/*';

export const ImageInputField = ({
  inputProps,
  error,
  className,
  droppable,
}: ImageInputFieldProps) => {
  const {
    dragProps,
    isDraggingOver,
    isDraggingInvalidOver,
    draggedFilesCount,
  } = useFileDragDrop({
    droppable: droppable,
    acceptFormats: [INPUT_ACCEPT],
    onDrop: (files: FileList) => {
      if (inputProps.onChange) {
        inputProps.onChange({
          target: { ...inputProps, files: files },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    },
  });

  const label = useMemo(() => {
    if (isDraggingInvalidOver) {
      return 'Format de fichier non supporté';
    }
    if (isDraggingOver && draggedFilesCount > 0) {
      return `Uploader ${draggedFilesCount}<br /> fichier${draggedFilesCount > 1 ? 's' : ''}`;
    }
    return 'Upload : Drag & Drop ou Cliquer ici';
  }, [isDraggingInvalidOver, isDraggingOver, draggedFilesCount]);

  return (
    <label
      htmlFor={inputProps?.id || 'imageValue'}
      className={`image-input-field ${dragProps.droppable ? ' droppable' : ''}  ${isDraggingOver ? 'image-input-field_dragging-over' : ''} ${isDraggingInvalidOver ? 'image-input-field_dragging-invalid-over' : ''} ${error ? 'form-input-file_error' : ''} ${className}`}
      {...dragProps}
    >
      <span className="image-input-field__content">
        <Icon name="plus" />
        <Icon name="close" color="error" />
        <span dangerouslySetInnerHTML={{ __html: label }} />
        <FormInput
          className="image-input-field__input"
          inputProps={{
            ...inputProps,
            type: 'file',
            accept: INPUT_ACCEPT,
          }}
        />
      </span>
    </label>
  );
};
