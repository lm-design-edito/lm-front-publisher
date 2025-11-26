import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Form } from '@common/components/forms/form';
import { FormSubmit } from '@common/components/forms/form-submit';
import { FormFooter } from '@common/components/forms/form-footer';
import { useCallback, useEffect, useState, useMemo } from 'react';
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
import { useImageGenerate } from '../../api/use-image-generate';
import { Display } from '@common/components/display';
import { Text } from '@common/components/text';

const MAX_SELECTION_IMG = 3;

const baseImageGeneratorFormSchema = zod.object({
  fileIds: zod
    .array(
      zod.string({
        message: 'Veuillez sélectionner au moins une image',
      }),
      {
        message: 'Veuillez sélectionner au moins une image',
      },
    )
    .min(1, {
      message: 'Veuillez sélectionner au moins une image',
    }),
  template: zod.enum(TemplateNameValues as [string, ...string[]], {
    message: 'Veuillez sélectionner un template.',
  }),
});

const createDynamicImageGeneratorFormSchema = (templateName?: string) => {
  if (!templateName) return baseImageGeneratorFormSchema;

  const templateConfigFields = getTemplateConfigFields(templateName);

  // Utiliser un Record pour gérer les types correctement
  const additionalFields: Record<string, zod.ZodTypeAny> = {};

  templateConfigFields.forEach(field => {
    const parts = field.name.split('.');

    if (parts.length > 1) {
      const [parentKey, childKey] = parts;

      // Si l'objet parent n'existe pas encore, le créer
      if (!additionalFields[parentKey]) {
        additionalFields[parentKey] = zod.object({
          [childKey]: field.validation,
        });
      } else {
        // Si l'objet parent existe déjà, l'étendre
        const existingSchema = additionalFields[parentKey] as zod.AnyZodObject;
        additionalFields[parentKey] = existingSchema.extend({
          [childKey]: field.validation,
        });
      }
    } else {
      additionalFields[field.name] = field.validation;
    }
  });

  return baseImageGeneratorFormSchema.extend(additionalFields);
};
type ImageGeneratorForm = {
  onGenerated: (image: { url: string; mimeType: string; name: string }) => void;
};

export const ImageGeneratorForm = ({ onGenerated }: ImageGeneratorForm) => {
  const [downloadPlaceholderCount, setDownloadPlaceholderCount] = useState(0);
  const [uploadIds, setUploadIds] = useState<string[]>([]);
  const [currentTemplateName, setCurrentTemplateName] = useState<string>();

  const imageUploads = useImageThumbsDownload({ idList: uploadIds });

  const { mutate: imageThumbUpload } = useImageThumbsUpload({
    onServerDown: () => {
      showToast({
        type: 'warning',
        id: 'upload-server-error',
        message:
          'Le serveur ne répond pas. La requête va tenter de se relancer. Veuillez patienter',
      });
    },
    onSuccess: data => {
      setUploadIds(data.payload.ids);
      setDownloadPlaceholderCount(0);
      showToast({
        type: 'success',
        message:
          'Vos fichiers ont bien été uploadés sur le serveur de LM Publisher.',
      });
      console.warn('Logout successful, user logged out.');
      // navigate({ to: appRoutes.index });
    },
    onError: error => {
      setDownloadPlaceholderCount(0);
      showToast({
        type: 'error',
        message:
          error.message ||
          "Une erreur a eu lieu lors de l'upload de vos fichiers.",
      });
      console.error('Upload failed:', error);
    },
  });

  const { mutate: imageGenerate, isPending: isPendingGenerate } =
    useImageGenerate({
      onServerDown: () => {
        showToast({
          type: 'warning',
          id: 'generate-server-error',
          message:
            'Le serveur ne répond pas. La requête va tenter de se relancer. Veuillez patienter',
        });
      },
      onSuccess: data => {
        showToast({
          type: 'success',
          message: 'Votre image a été génerée',
        });
        onGenerated(data.payload);
      },
      onError: error => {
        showToast({
          type: 'error',
          message:
            error.message ||
            'Une erreur a eu lieu lors de la génération de votre image.',
        });
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
        fileIds: currentValues.fileIds,
        // Les nouveaux champs dynamiques seront gérés par le nouveau schema
      });
    }
  }, [templateName, currentTemplateName, getValues, reset, onUnregister]);

  const { showToast, hideToast } = useToastContext();

  const onSubmit = (values: zod.infer<typeof dynamicSchema>) => {
    const { fileIds, template, ...otherFields } = values;
    imageGenerate({
      fileIds,
      template,
      options: otherFields,
    });
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
    return () => {
      hideToast('info-image-generator-beta');
    };
  }, [showToast, hideToast]);

  return (
    <FormProvider {...formMethods}>
      <Form className="image-generator-form" onSubmit={handleSubmit(onSubmit)}>
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
              maxSelection={MAX_SELECTION_IMG}
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
          <Display type="flex" direction="column">
            <Text className="lmui-form__placeholder form-label">
              Options du modèle
            </Text>

            {currentTemplateName ? (
              <ImageGeneratorTemplateFields
                templateName={currentTemplateName}
                configFields={templateConfigFields}
                control={control}
                errors={errors}
              />
            ) : (
              <Text>Sélectionnez un modèle pour choisir ses options.</Text>
            )}
          </Display>
        </FieldSet>

        <FormFooter>
          <FormSubmit
            isLoading={isPendingGenerate}
            disabled={isPendingGenerate}
          >
            Génerer
          </FormSubmit>
        </FormFooter>
      </Form>
    </FormProvider>
  );
};
