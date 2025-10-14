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
import { QueriesStatus } from '@common/components/queries-status';
import { useState } from 'react';
import { Logger } from '@utils/logger';
import { ImageSelector } from '../image-selector';

const MAX_IMAGES = 6;
const templateNames = ImageGeneratorTemplates.map(
  template => template.name,
) as [string, ...string[]];

const TEMP_IMAGE_LIST = [
  {
    id: 'trees',
    src: 'https://plus.unsplash.com/premium_photo-1759354756760-b4416a802588?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064',
  },
  {
    id: 'test',
    src: 'https://images.unsplash.com/photo-1760141090872-58109ce746bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=500',
  },
  {
    id: 'test2',
    src: 'https://images.unsplash.com/photo-1760301269447-fbc82b5a8d14?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500',
  },
  {
    id: 'matcha',
    src: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWF0Y2hhfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
  },
];

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

const imageGeneratorUploadFormSchema = zod.object({
  imageUpload: zod.instanceof(FileList).refine(files => files.length > 0, {
    message: 'Veuillez sélectionner une image.',
  }),
});
type ImageGeneratorUploadFormSchemaValues = zod.infer<
  typeof imageGeneratorUploadFormSchema
>;

export const ImageGeneratorForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ImageGeneratorFormSchemaValues>({
    resolver: zodResolver(imageGeneratorFormSchema),
  });

  const {
    register: registerUpload,
    // handleSubmit: handleSubmitUpload,
    // formState: { errors: errorsUpload },
  } = useForm<ImageGeneratorUploadFormSchemaValues>({
    resolver: zodResolver(imageGeneratorUploadFormSchema),
  });

  const [APIStatus, setAPIStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const { mutate: imageGenerate, isPending } = useImageTransform({
    onSuccess: data => {
      // if (data.success) {
      //   setAPIStatus({
      //     success: true,
      //     message: `${data.payload.message} : ${data.payload.images.length} images`,
      //   });
      // }
      Logger.success('image-tools.image-generator-form.useImageTransform', {
        data,
      });
      // Handle success logic here, e.g., show a success message or redirect
    },
    onError: error => {
      Logger.error('image-tools.image-generator-form.useImageTransform', {
        error,
      });
      setAPIStatus({ success: false, message: error.message });
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

  return (
    <Form className="image-generator-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="imageList"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImageSelector
            inputProps={registerUpload('imageUpload')}
            droppable={true}
            onSelectionChange={onChange}
            imageList={TEMP_IMAGE_LIST}
            selection={value}
          />
        )}
      ></Controller>

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
        {APIStatus && (
          <QueriesStatus status={APIStatus.success ? 'success' : 'error'}>
            {APIStatus.message}
          </QueriesStatus>
        )}
      </FormFooter>
    </Form>
  );
};
