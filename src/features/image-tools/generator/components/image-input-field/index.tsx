import {
  FormInput,
  type FormInputProps,
} from '@common/components/forms/form-input';
import { Icon } from '@common/components/icon';
import useFileDragDrop from '@common/hooks/useFileDragDrop';
import './style.css';

export type ImageInputFieldProps = {
  className?: string;
  error?: FormInputProps['error'];
  inputProps: FormInputProps['inputProps'];
  droppable?: boolean;
};

export const ImageInputField = ({
  inputProps,
  error,
  className,
  droppable,
}: ImageInputFieldProps) => {
  const { dragProps, isDraggingOver } = useFileDragDrop({
    droppable: droppable,
    onDrop: (files: FileList) => {
      const file = files[0];
      if (inputProps.onChange) {
        inputProps.onChange({
          target: { ...inputProps, files: files, value: file.name },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    },
  });

  return (
    <label
      htmlFor={inputProps?.id || 'imageValue'}
      className={`image-input-field ${dragProps.droppable ? ' droppable' : ''} ${isDraggingOver ? 'form-input-file_dragging-over' : ''} ${error ? 'form-input-file_error' : ''} ${className}`}
      {...dragProps}
    >
      <span className="image-input-field__content">
        <Icon name="plus" />
        <span>Ajouter une ou plusieurs images</span>
        <FormInput
          className="form-input-file__input"
          inputProps={{
            ...inputProps,
            id: 'imageValue',
            type: 'file',
            accept: 'image/*',
          }}
        />
      </span>
    </label>
  );
};
