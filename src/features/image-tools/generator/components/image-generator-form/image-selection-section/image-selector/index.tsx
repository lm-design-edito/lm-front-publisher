import { Form, type FormFieldsetProps } from '@common/components/forms';

import './style.css';
import {
  ImageInputField,
  type ImageInputFieldProps,
} from '../image-input-field';
import { ImageSelectablePreview } from './image-selectable-preview';
import { Display } from '@common/components/display';
import { Badge } from '@common/components/badge';
import { useMemo } from 'react';
import { ClearImageUploadIdsCacheButton } from '../../../clear-image-upload-ids-cache-button';

export type ImageSelectorProps = {
  imageList?: {
    src: string;
    alt?: string;
    id: string;
  }[];
  downloadPlaceholderCount: number;
  maxSelection: number;
  error?: FormFieldsetProps['error'];
  uploadDroppable?: boolean;
  uploadInputProps?: ImageInputFieldProps['inputProps'];
  selection?: string[]; // list of selected image ids
  onSelectionChange?: (selection: string[]) => void;
  onClearedCacheUploadIds: () => void;
};

export const ImageSelector = ({
  imageList,
  selection,
  maxSelection,
  downloadPlaceholderCount,
  uploadDroppable,
  uploadInputProps,
  onSelectionChange,
  onClearedCacheUploadIds,
  error,
  ...otherProps
}: ImageSelectorProps) => {
  const placeholders = useMemo(() => {
    const placeholder = [];
    for (let i = 0; i < downloadPlaceholderCount; i++) {
      placeholder.push(i);
    }
    return placeholder;
  }, [downloadPlaceholderCount]);

  return (
    <Form.Fieldset
      legend={
        <span className="image-selector__legend">
          Sélectionner une ou plusieurs images{' '}
          <span className="image-selector__count">
            <Badge color="blue" size="s">
              {selection?.length || 0} / {maxSelection} MAX)
            </Badge>
            {/* {selection?.length || 0} / {maxSelection} */}
          </span>
        </span>
      }
      error={error}
      className="image-selector"
      contentClassName="image-selector__content"
      additionalContent={
        imageList &&
        imageList?.length > 0 && (
          <ClearImageUploadIdsCacheButton
            buttonProps={{ size: 's' }}
            helperProps={{
              position: 'left',
            }}
            className="image-selector__emptyContentButton"
            onCleared={onClearedCacheUploadIds}
          />
        )
      }
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
        {placeholders.map(index => (
          <ImageSelectablePreview
            key={index}
            isPlaceholder={true}
            className="image-selector__preview"
          />
        ))}
        {imageList?.map(image => (
          <ImageSelectablePreview
            key={image.id}
            src={image.src}
            alt={image.alt}
            selected={selection?.includes(image.id) || false}
            selectionIndex={selection?.indexOf(image.id)}
            onChange={selected => {
              if (onSelectionChange) {
                const newSelection = selected
                  ? [...(selection || []), image.id]
                  : (selection || []).filter(id => id !== image.id);
                if (newSelection.length > maxSelection) {
                  return;
                }
                onSelectionChange(newSelection);
              }
            }}
            className="image-selector__preview"
          />
        ))}
      </Display>
    </Form.Fieldset>
  );
};
