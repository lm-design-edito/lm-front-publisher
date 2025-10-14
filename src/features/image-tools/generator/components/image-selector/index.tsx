import { FieldSet } from '@common/components/forms/fieldset';

import './style.css';
import {
  ImageInputField,
  type ImageInputFieldProps,
} from '../image-input-field';
import { ImageSelectablePreview } from '../image-selectable-preview';
import { Display } from '@common/components/display';

export type Props = {
  imageList?: {
    src: string;
    alt?: string;
    id: string;
  }[];
  droppable?: boolean;
  inputProps: ImageInputFieldProps['inputProps'];
  selection?: string[]; // list of selected image ids
  onSelectionChange?: (selection: string[]) => void;
};

export const ImageSelector = ({
  droppable,
  imageList,
  selection,
  inputProps,
  onSelectionChange,
  ...otherProps
}: Props) => {
  return (
    <FieldSet
      legend={
        <span className="image-selector__legend">
          Sélectionner une image{' '}
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
          droppable={droppable}
          inputProps={inputProps}
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
