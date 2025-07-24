import * as zod from 'zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@common-components/forms/form';
import { FormInputFile } from '@common-components/forms/form-input-file';
import { FormInputCheckboxGroup } from '@common-components/forms/form-input-checkbox-group';
import { TinyLMGFitOptions, TinyLMGFormats } from '../../config';
import { FormFooter } from '@common-components/forms/form-footer';
import { FormSubmit } from '@common-components/forms/form-submit';
import { Button } from '@common-components/buttons/button';
import { FormInput } from '@common-components/forms/form-input';
import { FieldSet } from '@common-components/forms/fieldset';
import { Display } from '@common-components/display';
import { FormSelect } from '@common-components/forms/form-select';

import { useImageFormat } from '../../api';

import './style.css';

const TinyLMGFormatsValues = TinyLMGFormats.map(format => format.value) as [
  string,
  ...string[],
];
const TinyLMGFitOptionsFormatValues = TinyLMGFitOptions.map(
  option => option.value,
) as [string, ...string[]];

const tinyLMGFormSchema = zod.object({
  image: zod.instanceof(File, {
    message: 'Veuillez sélectionner une image (une seule à la fois).',
  }),
  imageValue: zod.string().min(1, {
    message: 'Veuillez sélectionner une image.',
  }),
  formats: zod.array(
    zod.enum(TinyLMGFormatsValues, {
      message: 'Veuillez sélectionner au moins un format.',
    }),
    {
      message: 'Veuillez sélectionner au moins un format.',
    },
  ),
  width: zod.coerce
    .number()
    .min(1, {
      message: 'La largeur doit être supérieure à 0.',
    })
    .refine(value => value > 0, {
      message: 'La hauteur doit être supérieure à 0.',
    }),
  height: zod.coerce
    .number()
    .min(1, {
      message: 'La largeur doit être supérieure à 0.',
    })
    .refine(value => value > 0, {
      message: 'La hauteur doit être supérieure à 0.',
    }),
  fit: zod.enum(TinyLMGFitOptionsFormatValues, {
    message: 'Veuillez sélectionner un mode de redimensionnement.',
  }),
  quality: zod.coerce.number().min(1).max(100).optional(),
  compressionLevel: zod.coerce.number().min(1).max(100).optional(),
});
type TinyLMGFormSchemaValues = zod.infer<typeof tinyLMGFormSchema>;

export const TinyLMGForm = () => {
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TinyLMGFormSchemaValues>({
    resolver: zodResolver(tinyLMGFormSchema),
  });

  const [imgPreviewUrl, setImgPreviewUrl] = useState<string | null>(null);

  const { mutate: imageFormat } = useImageFormat({
    onSuccess: data => {
      console.log('Image formatted successfully:', data);
    },
    onError: error => {
      console.error('Error formatting image:', error);
    },
  });

  const onSubmit = async (data: TinyLMGFormSchemaValues) => {
    console.log('Form submitted with data:', data);
    for await (const format of data.formats) {
      const res = imageFormat({
        width: data.width,
        height: data.height,
        format: format,
        fit: data.fit,
        quality: data.quality ?? 100,
        compressionLevel: data.compressionLevel ?? 90,
        file: data.image,
      });
      console.log({ res });
    }
    // Handle form submission logic here
  };

  const fit = watch('fit');
  const [inputImageDimensions, setInputImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const getFormImageDimensions = (
    files: FileList,
  ): Promise<{
    width: number;
    height: number;
  }> => {
    return new Promise(resolve => {
      setValue('image', files[0]);
      if (!files || !files.length) {
        resolve({
          width: 0,
          height: 0,
        });
      }
      const file = files[0];
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };
    });
  };

  const applyDimensionsFormValues = (width: number, height: number) => {
    setValue('width', width);
    setValue('height', height);
  };

  const onSelectAllFormats = () => {
    const currentFormats = getValues('formats');
    if (currentFormats.length === TinyLMGFormatsValues.length) {
      setValue('formats', []);
    } else {
      setValue('formats', TinyLMGFormatsValues);
    }
  };

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    const file = files ? files[0] : null;
    if (files && file) {
      const dimensions = await getFormImageDimensions(files);
      setInputImageDimensions(dimensions);
      applyDimensionsFormValues(dimensions.width, dimensions.height);
      setImgPreviewUrl(URL.createObjectURL(file));
      return;
    }
    setImgPreviewUrl(null);
  };

  const onClickKeepImageDimensions = async () => {
    applyDimensionsFormValues(
      inputImageDimensions.width,
      inputImageDimensions.height,
    );
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
            previewUrl={imgPreviewUrl}
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
            error={errors['imageValue']}
          />
        )}
      />
      <FieldSet legend="Dimensions">
        <Display
          type="flex"
          direction="row"
          justify="space-between"
          align="center"
        >
          <FormInput
            label="Largeur"
            labelProps={{ htmlFor: 'width' }}
            inputProps={{
              id: 'width',
              type: 'number',
              min: 1,
              ...register('width'),
            }}
            error={errors['width']}
          />
          x{' '}
          <FormInput
            label="Hauteur"
            labelProps={{ htmlFor: 'height' }}
            inputProps={{
              id: 'height',
              type: 'number',
              min: 1,
              ...register('height'),
            }}
            error={errors['height']}
          />
          <Button
            type="button"
            variant="secondary"
            size="s"
            onClick={onClickKeepImageDimensions}
          >
            Garder les dimensions de l'image d'origine
          </Button>
        </Display>
        <FormSelect
          label="Mode de redimensionnement"
          options={TinyLMGFitOptions}
          helper={{
            position: 'left',
            text: TinyLMGFitOptions.find(option => option.value === fit)
              ?.description,
          }}
          className="lm-publisher-m-t-spacer-3"
          selectProps={{
            id: 'fit',
            ...register('fit'),
          }}
        />
      </FieldSet>
      <FormInputCheckboxGroup
        label="Formats"
        inputGroupProps={TinyLMGFormats.map(format => ({
          id: `format-${format.value}`,
          label: format.label,
          labelProps: {
            htmlFor: `format-input-${format.value}`,
          },
          inputProps: {
            id: `format-input-${format.value}`,
            value: format.value,
            ...register('formats'),
          },
        }))}
        error={errors.formats}
      >
        <Button
          variant="secondary"
          size="s"
          className="lm-publisher-m-t-spacer"
          type="button"
          onClick={() => onSelectAllFormats()}
        >
          Tout sélectionner / désélectionner
        </Button>
      </FormInputCheckboxGroup>
      <FormInput
        label="Qualité"
        labelProps={{ htmlFor: 'quality' }}
        inputProps={{
          id: 'quality',
          type: 'number',
          min: 1,
          max: 100,
          defaultValue: 100,
          ...register('quality'),
        }}
        error={errors['quality']}
      />
      <FormInput
        label="Niveau de compression (.png uniquement)"
        labelProps={{ htmlFor: 'compressionLevel' }}
        inputProps={{
          id: 'compressionLevel',
          type: 'number',
          min: 1,
          max: 100,
          defaultValue: 90,
          ...register('compressionLevel'),
        }}
        error={errors['compressionLevel']}
      />
      <FormFooter>
        <FormSubmit>Compresser</FormSubmit>
      </FormFooter>
    </Form>
  );
};
