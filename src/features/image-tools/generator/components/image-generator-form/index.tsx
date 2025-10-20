import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Form } from '@common/components/forms/form';
import { useImageTransform } from '../../api/use-image-transform';
import { FormSubmit } from '@common/components/forms/form-submit';
import { FormFooter } from '@common/components/forms/form-footer';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Logger } from '@utils/logger';
import { ImageSelector, type ImageSelectorProps } from '../image-selector';
import { useToastContext } from '@common/hooks/useToastContext';
import { getTemplateConfigFields } from '../../utils/get-template-config-fields';
import { ImageGeneratorTemplateFields } from '../image-generator-template-fields';
import { TemplateList, TemplateNameValues } from '../../config/templates';
import { FieldSet } from '@common/components/forms/fieldset';

import './style.css';
import { TemplateSelector } from '../template-selector';

const MAX_SELECTION_IMG = 6;

const baseImageGeneratorFormSchema = zod.object({
  imageList: zod
    .array(zod.string())
    .min(1)
    .max(MAX_SELECTION_IMG)
    .refine(val => val.length <= MAX_SELECTION_IMG, {
      message: `Veuillez sélectionner jusqu'à ${MAX_SELECTION_IMG} images.`,
    }),
  imageUpload: zod.instanceof(FileList).refine(files => files.length > 0, {
    message: 'Veuillez sélectionner une image.',
  }),
  template: zod.enum(TemplateNameValues as [string, ...string[]], {
    message: 'Veuillez sélectionner un template.',
  }),
});

const createDynamicImageGeneratorFormSchema = (templateName?: string) => {
  if (!templateName) return baseImageGeneratorFormSchema;

  const templateConfigFields = getTemplateConfigFields(templateName);
  let additionalSchema = zod.object({});

  templateConfigFields.forEach(field => {
    additionalSchema = additionalSchema.extend({
      [field.name]: field.validation,
    });
  });

  return baseImageGeneratorFormSchema.extend(additionalSchema.shape);
};

export const ImageGeneratorForm = () => {
  const [currentTemplateName, setCurrentTemplateName] = useState<string>();

  // Créer le schema dynamiquement
  const dynamicSchema = useMemo(
    () => createDynamicImageGeneratorFormSchema(currentTemplateName),
    [currentTemplateName],
  );

  const formMethods = useForm({
    resolver: zodResolver(dynamicSchema),
  });
  const {
    unregister,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = formMethods;

  const templateName = watch('template');

  const templateConfigFields = getTemplateConfigFields(currentTemplateName);

  // Callback pour désinscrire les anciens champs
  const onUnregister = useCallback(
    (fieldNames: string[]) => {
      fieldNames.forEach(field => {
        /* @ts-expect-error: field as templateConfigField */
        unregister(field);
      });
    },
    [unregister],
  );

  // Gérer le changement de template
  useEffect(() => {
    if (templateName && templateName !== currentTemplateName) {
      // Sauvegarder les valeurs de base
      const currentValues = getValues();

      // Désinscrire les anciens champs dynamiques
      if (currentTemplateName) {
        const oldFields = getTemplateConfigFields(currentTemplateName);
        onUnregister(oldFields.map(field => field.name));
      }

      // Mettre à jour le template actuel
      setCurrentTemplateName(templateName);

      // Reset partiel du form en gardant les champs de base
      reset({
        template: currentValues.template,
        imageList: currentValues.imageList,
        imageUpload: currentValues.imageUpload,
        // Les nouveaux champs dynamiques seront gérés par le nouveau schema
      });
    }
  }, [templateName, currentTemplateName, getValues, reset, onUnregister]);

  console.log({ templateConfigFields });

  const { showToast } = useToastContext();

  const [tempImageList, setTempImageList] = useState<
    ImageSelectorProps['imageList']
  >([]);

  const { isPending } = useImageTransform({
    onSuccess: data => {
      showToast({
        type: 'success',
        message: 'Image générée avec succès',
      });
      Logger.success('image-tools.image-generator-form.useImageTransform', {
        data,
      });
    },
    onError: error => {
      Logger.error('image-tools.image-generator-form.useImageTransform', {
        error,
      });
      showToast({
        type: 'error',
        message: error.message,
      });
    },
  });

  const onSubmit = () => {
    // imageGenerate({
    //   file: values.imageUpload[0],
    //   operations:
    //     ImageGeneratorTemplatesConfig[values.template] &&
    //     'operations' in
    //       (ImageGeneratorTemplatesConfig[values.template] as Record<
    //         string,
    //         unknown
    //       >)
    //       ? (
    //           ImageGeneratorTemplatesConfig[values.template] as {
    //             operations?: unknown[];
    //           }
    //         ).operations || []
    //       : [],
    // });
  };

  const onChangeUpload: React.ChangeEventHandler<HTMLInputElement> = e => {
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
      duration: 0,
      message: `Le générateur d'images est en version bêta. Les résultats peuvent varier.`,
    });
  }, [showToast]);

  return (
    <FormProvider {...formMethods}>
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
              maxSelection={MAX_SELECTION_IMG}
              uploadDroppable={true}
              onSelectionChange={onChange}
              imageList={tempImageList}
              selection={value}
              error={errors['imageList']}
            />
          )}
        />
        <FieldSet
          legend="Choix du modèle"
          contentClassName="image-generator-form__template-fieldset"
        >
          <Controller
            name="template"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TemplateSelector
                templateList={TemplateList}
                selectedTemplate={value}
                onSelectTemplate={onChange}
                error={errors['template']}
              />
            )}
          />
          <ImageGeneratorTemplateFields
            templateName={currentTemplateName}
            configFields={templateConfigFields}
            control={control}
            /* @ts-expect-error: errors as templateConfigField @todo */
            errors={errors}
          />
        </FieldSet>

        <FormFooter>
          <FormSubmit isLoading={isPending}>Génerer</FormSubmit>
        </FormFooter>
      </Form>
    </FormProvider>
  );
};
