import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Form } from '@common/components/forms/form';
import { useImageTransform } from '../../api/use-image-transform';
import { FormSubmit } from '@common/components/forms/form-submit';
import { FormFooter } from '@common/components/forms/form-footer';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Logger } from '@utils/logger';
import { ImageSelector } from '../image-selector';
import { useToastContext } from '@common/hooks/useToastContext';
import { getTemplateConfigFields } from '../../utils/get-template-config-fields';
import { ImageGeneratorTemplateFields } from '../image-generator-template-fields';
import { TemplateList, TemplateNameValues } from '../../config/templates';
import { FieldSet } from '@common/components/forms/fieldset';

import './style.css';
import { TemplateSelector } from '../template-selector';
import { useImageThumbsUpload } from '../../api/use-image-thumbs-upload';
import { useImageThumbsDownload } from '../../api/use-image-thumbs-download';

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
  const [downloadPlaceholderCount, setDownloadPlaceholderCount] = useState(0);
  const [uploadIds, setUploadIds] = useState<string[]>([]);
  const [currentTemplateName, setCurrentTemplateName] = useState<string>();

  const imageUploads = useImageThumbsDownload({ idList: uploadIds });
  const { mutate: imageThumbUpload } = useImageThumbsUpload({
    onSuccess: data => {
      setUploadIds(data.payload.ids);
      setDownloadPlaceholderCount(0);
      showToast({
        type: 'success',
        message: 'Upload Success',
      });
      console.warn('Logout successful, user logged out.');
      // navigate({ to: appRoutes.index });
    },
    onError: error => {
      setDownloadPlaceholderCount(0);
      showToast({
        type: 'error',
        message: 'Erreur lors de la déconnexion',
      });
      console.error('Logout failed:', error);
    },
  });

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

  const { showToast } = useToastContext();

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
    if (e.target.files) {
      const uploadFiles = [...e.target.files]
        .filter(file => file !== undefined)
        .map(file => ({
          image: file,
        }));
      imageThumbUpload(uploadFiles);
      setDownloadPlaceholderCount(uploadFiles.length);
    }
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
              downloadPlaceholderCount={downloadPlaceholderCount}
              maxSelection={MAX_SELECTION_IMG}
              uploadDroppable={true}
              onSelectionChange={onChange}
              imageList={imageUploads.map(imageUpload => ({
                ...imageUpload,
                src: imageUpload.url,
              }))}
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
