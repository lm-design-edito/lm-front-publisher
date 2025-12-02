import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { ImageSelector } from './image-selector';
import { useImageThumbsDownload } from '../../../services/use-image-thumbs-download';

type Props = {
  control: Control;
  errors: FieldErrors;
  uploadIds: string[];
  downloadPlaceholderCount: number;
  onChangeUpload: React.ChangeEventHandler<HTMLInputElement>;
  maxSelection: number;
};

export const ImageSelectionSection = ({
  control,
  errors,
  uploadIds,
  downloadPlaceholderCount,
  onChangeUpload,
  maxSelection,
}: Props) => {
  const imageUploads = useImageThumbsDownload({ idList: uploadIds });

  return (
    <Controller
      name="fileIds"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ImageSelector
          uploadInputProps={{
            id: 'image-upload',
            onChange: onChangeUpload,
            multiple: true,
          }}
          downloadPlaceholderCount={downloadPlaceholderCount}
          maxSelection={maxSelection}
          uploadDroppable={true}
          onSelectionChange={onChange}
          imageList={imageUploads.map(imageUpload => ({
            ...imageUpload,
            src: imageUpload.url,
          }))}
          selection={value}
          error={errors['fileIds']}
        />
      )}
    />
  );
};
