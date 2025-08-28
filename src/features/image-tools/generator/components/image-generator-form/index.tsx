import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@common-components/forms/form';
import { FormInputFile } from '@common-components/forms/form-input-file';
import {
  ImageGeneratorTemplatesConfig,
  ImageGeneratorTemplates,
} from '../../config/templates';
 import { useImageTransform } from '../../api/use-image-transform';
import { FormInputRadioGroup } from '@common-components/forms/form-input-radio-group';
import { FormSubmit } from '@common-components/forms/form-submit';
import { FormFooter } from '@common-components/forms/form-footer';
import { QueriesStatus } from '@common-components/queries-status';
import { useState } from 'react';
import { Logger } from '@utils/logger';

const templateNames = ImageGeneratorTemplates.map(
  template => template.name,
) as [string, ...string[]];

const imageGeneratorFormSchema = zod.object({
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
    formState: { errors },
  } = useForm<ImageGeneratorFormSchemaValues>({
    resolver: zodResolver(imageGeneratorFormSchema),
  });

  const [APIStatus, setAPIStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const { mutate: imageGenerate, isPending } = useImageTransform({
    onSuccess: data => {
      if (data.success) {
        setAPIStatus({
          success: true,
          message: `${data.payload.message} : ${data.payload.images.length} images`,
        });
      }
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
      <FormInputFile
        label="Image"
        labelProps={{ htmlFor: 'image-upload' }}
        inputProps={{
          id: 'image-upload',
          ...register('imageUpload'),
        }}
        error={errors['imageUpload']} // Replace 'imageUpload' with your actual field name
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
        {APIStatus && (
          <QueriesStatus status={APIStatus.success ? 'success' : 'error'}>
            {APIStatus.message}
          </QueriesStatus>
        )}
      </FormFooter>
    </Form>
  );
};
