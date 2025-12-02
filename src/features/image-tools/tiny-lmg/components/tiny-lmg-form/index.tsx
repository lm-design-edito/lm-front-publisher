import * as zod from 'zod';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@common/components/forms';
import { TinyLMGFitOptions, TinyLMGFormats } from '../../config';
import { Button } from '@common/components/buttons/button';
import { Display } from '@common/components/display';

import './style.css';
import { useImageMultiFormat } from '../../api/use-image-multi-format';
import { Logger } from '@utils/logger';
import { ToastContext } from '@common/providers/toast/toastContext';

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
  imageValue: zod.string().optional(),
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

interface TinyLMGFormProps {
  onDownloadReady: (
    downloads: {
      name: string;
      url: string;
      sourceName: string;
      mimeType: string;
      date: Date;
      quality: number;
      dimensions: { width: number; height: number };
    }[],
  ) => void;
}

export const TinyLMGForm = ({ onDownloadReady }: TinyLMGFormProps) => {
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

  const [imgPreview, setImgPreview] = useState<{
    name: string | null;
    url: string | null;
  }>({
    name: null,
    url: null,
  });

  const { showToast } = useContext(ToastContext);

  const { mutate: imageMultiFormat, isPending } = useImageMultiFormat({
    onSuccess: data => {
      Logger.success('image-tools.tiny-lmg-form.useImageMultiFormat', { data });
      showToast({
        type: 'success',
        message: 'Image(s) générée(s) avec succès.',
      });
      onDownloadReady(
        data.list.map(item => ({
          name: item.name,
          url: item.url,
          mimeType: item.mimeType,
          sourceName: item.source.name,
          dimensions: item.dimensions,
          quality: item.quality,
          date: item.date,
        })),
      );
    },
    onError: error => {
      Logger.error('image-tools.tiny-lmg-form.useImageMultiFormat', { error });
      showToast({
        type: 'error',
        message:
          error.message ||
          "Une erreur est survenue lors de la génération de l'image.",
      });
    },
  });

  const onSubmit = async (data: TinyLMGFormSchemaValues) => {
    imageMultiFormat({
      width: data.width,
      height: data.height,
      formats: data.formats,
      fit: data.fit,
      quality: data.quality ?? 100,
      compressionLevel: data.compressionLevel ?? 90,
      file: data.image,
    });
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
      setImgPreview({
        url: URL.createObjectURL(file),
        name: file.name,
      });
      return;
    }
    setImgPreview({ url: null, name: null });
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
                field.onChange(e); // Call the field's onChange to update the form state
              },
              accept: '.png,.jpg,.jpeg',
            }}
            error={errors['image']}
          />
        )}
      />
      <Form.Fieldset legend="Dimensions">
        <Display
          type="flex"
          direction="row"
          justify="space-between"
          align="center"
        >
          <Form.Input
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
          <Form.Input
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
            Garder les dimensions d'origine
          </Button>
        </Display>
        <Form.Select
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
      </Form.Fieldset>
      <Form.CheckboxGroup
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
      </Form.CheckboxGroup>
      <Form.Input
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
      <Form.Input
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
      <Form.Footer>
        <Form.Submit isLoading={isPending}>Compresser</Form.Submit>
      </Form.Footer>
    </Form>
  );
};
