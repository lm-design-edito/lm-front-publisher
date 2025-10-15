import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '@common/components/forms/form';
import {
  ImageGeneratorTemplatesConfig,
  ImageGeneratorTemplates,
} from '../../config/templates';
import { useImageTransform } from '../../api/use-image-transform';
import { FormInputRadioGroup } from '@common/components/forms/form-input-radio-group';
import { FormSubmit } from '@common/components/forms/form-submit';
import { FormFooter } from '@common/components/forms/form-footer';
import { useEffect, useState } from 'react';
import { Logger } from '@utils/logger';
import { ImageSelector, type ImageSelectorProps } from '../image-selector';
import { useToastContext } from '@common/hooks/useToastContext';

const MAX_IMAGES = 6;
const templateNames = ImageGeneratorTemplates.map(
  template => template.name,
) as [string, ...string[]];

const imageGeneratorFormSchema = zod.object({
  imageList: zod
    .array(zod.string())
    .min(1)
    .max(MAX_IMAGES)
    .refine(val => val.length <= MAX_IMAGES, {
      message: `Veuillez sélectionner jusqu'à ${MAX_IMAGES} images.`,
    }),
  imageUpload: zod.instanceof(FileList).refine(files => files.length > 0, {
    message: 'Veuillez sélectionner une image.',
  }),
  template: zod.enum(templateNames, {
    message: 'Veuillez sélectionner un template.',
  }),
  // Define your schema here
});
type ImageGeneratorFormSchemaValues = zod.infer<
  typeof imageGeneratorFormSchema
>;

export const ImageGeneratorForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
    setValue,
  } = useForm<ImageGeneratorFormSchemaValues>({
    resolver: zodResolver(imageGeneratorFormSchema),
  });

  const { showToast } = useToastContext();

  const [tempImageList, setTempImageList] = useState<
    ImageSelectorProps['imageList']
  >([]);

  const { mutate: imageGenerate, isPending } = useImageTransform({
    onSuccess: data => {
      showToast({
        type: 'success',
        message: 'Image générée avec succès',
      });
      Logger.success('image-tools.image-generator-form.useImageTransform', {
        data,
      });
      // Handle success logic here, e.g., show a success message or redirect
    },
    onError: error => {
      Logger.error('image-tools.image-generator-form.useImageTransform', {
        error,
      });
      showToast({
        type: 'error',
        message: error.message,
      });
      // Handle error logic here, e.g., show an error message
    },
  });

  const onSubmit = (values: ImageGeneratorFormSchemaValues) => {
    imageGenerate({
      file: values.imageUpload[0], // Access the first file from FileList
      /* @ts-expect-error: @todo define operations types */
      operations:
        ImageGeneratorTemplatesConfig[values.template] &&
        'operations' in
          (ImageGeneratorTemplatesConfig[values.template] as Record<
            string,
            unknown
          >)
          ? (
              ImageGeneratorTemplatesConfig[values.template] as {
                operations?: unknown[];
              }
            ).operations || []
          : [], // Get the template configuration
    });
    // Handle form submission logic here
  };

  const onChangeUpload: React.ChangeEventHandler<HTMLInputElement> = e => {
    /* @todo: call api here */
    const imageIds = e.target.files
      ? Array.from(e.target.files).map(file => file.name)
      : [];

    setTempImageList((currentImageList: ImageSelectorProps['imageList']) => [
      ...(e.target.files
        ? Array.from(e.target.files).map(file => ({
            id: file.name,
            src: URL.createObjectURL(file),
          }))
        : []),
      ...(currentImageList || []),
    ]);

    const currentValues = getValues('imageList');

    setValue('imageList', [...(currentValues || []), ...imageIds]);
  };


  useEffect(() => {
    showToast({
      groupId: 'image-generator-form',
      id: 'info-image-generator-beta',
      type: 'info',
      message: `Le générateur d'images est en version bêta. Les résultats peuvent varier.`,
    });
  }, [showToast]);

  return (
    <Form className="image-generator-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="imageList"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImageSelector
            uploadInputProps={{
              id: 'image-upload',
              onChange: onChangeUpload,
            }}
            uploadDroppable={true}
            onSelectionChange={onChange}
            imageList={tempImageList}
            selection={value}
            error={errors['imageList']}
          />
        )}
      />

      <FormInputRadioGroup
        label="Template"
        inputGroupProps={ImageGeneratorTemplates.map((template, index) => ({
          // value: template.value,
          id: `template-${index}`,
          label: template.label,
          labelProps: {
            htmlFor: `template-input-${index}`,
          },
          inputProps: {
            id: `template-input-${index}`,
            value: template.name,
            ...register('template'),
          },
        }))}
        error={errors['template']} // Replace 'template' with your actual field name
      />
      <FormFooter>
        <FormSubmit isLoading={isPending}>Génerer</FormSubmit>
      </FormFooter>
    </Form>
  );
};
