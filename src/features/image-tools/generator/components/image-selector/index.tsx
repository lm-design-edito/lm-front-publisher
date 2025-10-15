import {
  FieldSet,
  type FieldsetProps,
} from '@common/components/forms/fieldset';

import './style.css';
import {
  ImageInputField,
  type ImageInputFieldProps,
} from '../image-input-field';
import { ImageSelectablePreview } from '../image-selectable-preview';
import { Display } from '@common/components/display';

export type ImageSelectorProps = {
  imageList?: {
    src: string;
    alt?: string;
    id: string;
  }[];
  error?: FieldsetProps['error'];
  uploadDroppable?: boolean;
  uploadInputProps?: ImageInputFieldProps['inputProps'];
  selection?: string[]; // list of selected image ids
  onSelectionChange?: (selection: string[]) => void;
};

export const ImageSelector = ({
  imageList,
  selection,
  uploadDroppable,
  uploadInputProps,
  onSelectionChange,
  ...otherProps
}: ImageSelectorProps) => {
  return (
    <FieldSet
      legend={
        <span className="image-selector__legend">
          Sélectionner une ou plusieurs images{' '}
          <span className="image-selector__count">
            {selection?.length || 0}
          </span>
        </span>
      }
      className="image-selector"
      contentClassName="image-selector__content"
      {...otherProps}
    >
      <div className="image-selector__sticky">
        <ImageInputField
          inputProps={{
            id: 'image-selector-upload',
            ...uploadInputProps,
          }}
          droppable={uploadDroppable}
          className="image-selector__input"
        />
      </div>
      <Display type="flex" className="image-selector__preview-list">
        {imageList?.map(image => (
          <ImageSelectablePreview
            key={image.id}
            src={image.src}
            alt={image.alt}
            selected={selection?.includes(image.id) || false}
            onChange={selected => {
              if (onSelectionChange) {
                const newSelection = selected
                  ? [...(selection || []), image.id]
                  : (selection || []).filter(id => id !== image.id);
                onSelectionChange(newSelection);
              }
            }}
            className="image-selector__preview"
          />
        ))}
      </Display>
    </FieldSet>
  );
};
