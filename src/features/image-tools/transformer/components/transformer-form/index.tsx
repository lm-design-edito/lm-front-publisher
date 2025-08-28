import { Form } from '@common-components/forms/form';
import { FormFooter } from '@common-components/forms/form-footer';
import { FormInput } from '@common-components/forms/form-input';
import { FormInputFile } from '@common-components/forms/form-input-file';
import { FormSubmit } from '@common-components/forms/form-submit';
import { zodResolver } from '@hookform/resolvers/zod';
import { Logger } from '@utils/logger';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { useImageTransform } from '../../api/use-image-transform';

const transformerFormSchema = zod.object({
  image: zod.instanceof(File, {
    message: 'Veuillez sélectionner une image (une seule à la fois).',
  }),
  imageValue: zod.string().optional(),
  // operations: zod.array(zod.string()).optional(),
  blur: zod.object({
    sigma: zod.coerce.number().min(0).max(100).optional(),
    // Add any other properties you need for the blur effect
  }),
});

type TransformerFormSchemaValues = zod.infer<typeof transformerFormSchema>;

export const TransformerForm = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TransformerFormSchemaValues>({
    resolver: zodResolver(transformerFormSchema),
  });
  // Form implementation goes here

  const { mutate: imageTransform } = useImageTransform({
    onSuccess: (data) => {
      Logger.success('image-tools.transformer.useImageTransformer', { data });
      // Handle success
    },
    onError: (error) => {
      // Handle error
      Logger.error('image-tools.transformer.useImageTransformer', { error });
    },
  });

  const [imgPreview, setImgPreview] = useState<{
    name: string | null;
    url: string | null;
  }>({
    name: null,
    url: null,
  });

  const onSubmit = async (data: TransformerFormSchemaValues) => {
    imageTransform({
      image: data.image,
      operations: [
        {
          name: 'blur',
          sigma: typeof data.blur.sigma === 'number' ? data.blur.sigma : 0,
        },
      ],
    });
    // Handle form submission
    Logger.log('TransformerForm onSubmit', { data });
  };
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    const file = files ? files[0] : null;
    if (files && file) {
      setValue('image', files[0]);
      setImgPreview({
        name: file.name,
        url: URL.createObjectURL(file),
      });
      return;
    }
    setImgPreview({
      name: null,
      url: null,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="imageValue"
        control={control}
        render={({ field }) => (
          <FormInputFile
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
                field.onChange(e); // Call the field's onChange to update the form state
              },
              accept: '.png,.jpg,.jpeg',
            }}
            error={errors['image']}
          />
        )}
      />
      <FormInput
        label="Blur"
        labelProps={{ htmlFor: 'blur.sigma' }}
        inputProps={{
          id: 'blur.sigma',
          type: 'number',
          min: 1,
          max: 100,
          defaultValue: 100,
          ...register('blur.sigma'),
        }}
        error={errors['blur']?.sigma}
      />
      <FormFooter>
        <FormSubmit>Transformer</FormSubmit>
      </FormFooter>
    </Form>
  );
};
