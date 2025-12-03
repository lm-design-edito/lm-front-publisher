import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { Form } from '@common/components/forms';
import type { TinyLMGFormSchemaValues } from '../schema';

type Props = {
  control: Control<TinyLMGFormSchemaValues>;
  errors: FieldErrors<TinyLMGFormSchemaValues>;
  imgPreview: {
    url: string | null;
    name: string | null;
  };
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ImageUploadSection = ({
  control,
  errors,
  imgPreview,
  onChangeImage,
}: Props) => {
  return (
    <Controller
      name="imageValue"
      control={control}
      render={({ field }) => (
        <Form.InputFile
          label="Image"
          labelProps={{ htmlFor: 'imageValue' }}
          preview={{
            url: imgPreview.url,
            name: imgPreview.name || 'Aucune image sélectionnée',
          }}
          droppable
          inputProps={{
            id: 'imageValue',
            type: 'file',
            onChange: e => {
              onChangeImage(e);
              field.onChange(e);
            },
            accept: '.png,.jpg,.jpeg',
          }}
          error={errors.image}
        />
      )}
    />
  );
};
