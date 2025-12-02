import * as zod from 'zod';
import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToastContext } from '@common/hooks/useToastContext';
import { useImageThumbsUpload } from '../../services/use-image-thumbs-upload';
import { useImageGenerate } from '../../services/use-image-generate';
import { createDynamicImageGeneratorFormSchema } from './form-schema';
import { getModelConfigDefaultOptions } from '../../utils/get-model-config-default-options';

export function useImageGeneratorForm(
  onGenerated: (image: { url: string; mimeType: string; name: string }) => void,
) {
  const [downloadPlaceholderCount, setDownloadPlaceholderCount] = useState(0);
  const [uploadIds, setUploadIds] = useState<string[]>([]);
  const [currentModelName, setCurrentModelName] = useState<string>();

  const { showToast } = useToastContext();

  const clearUploadIds = useCallback(() => {
    setUploadIds([]);
  }, []);

  // Schema dynamique
  const dynamicSchema = useMemo(
    () => createDynamicImageGeneratorFormSchema(currentModelName),
    [currentModelName],
  );

  // Form
  const formMethods = useForm({
    resolver: zodResolver(dynamicSchema),
  });

  // Image uploads
  const { mutate: imageThumbUpload } = useImageThumbsUpload({
    onServerDown: () => {
      showToast({
        type: 'warning',
        id: 'upload-server-error',
        message: 'Le serveur ne répond pas. Veuillez patienter',
      });
    },
    onSuccess: data => {
      setUploadIds(data.payload.ids);
      setDownloadPlaceholderCount(0);
      showToast({
        type: 'success',
        message: 'Vos fichiers ont bien été uploadés.',
      });
    },
    onError: error => {
      setDownloadPlaceholderCount(0);
      showToast({
        type: 'error',
        message: error.message || "Erreur lors de l'upload.",
      });
    },
  });

  // Image generation
  const { mutate: imageGenerate, isPending: isPendingGenerate } =
    useImageGenerate({
      onServerDown: () => {
        showToast({
          type: 'warning',
          id: 'generate-server-error',
          message: 'Le serveur ne répond pas. Veuillez patienter',
        });
      },
      onSuccess: data => {
        showToast({
          type: 'success',
          message: 'Votre image a été générée',
        });
        onGenerated(data.payload);
      },
      onError: error => {
        showToast({
          type: 'error',
          message: error.message || 'Erreur lors de la génération.',
        });
      },
    });

  // Handlers
  const onChangeUpload: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      e => {
        if (e.target.files) {
          const uploadFiles = [...e.target.files]
            .filter(file => file !== undefined)
            .map(file => ({ image: file }));
          imageThumbUpload(uploadFiles);
          setDownloadPlaceholderCount(uploadFiles.length);
        }
      },
      [imageThumbUpload],
    );

  const onSubmit = useCallback(
    (values: zod.infer<typeof dynamicSchema>) => {
      const defaultOptions = getModelConfigDefaultOptions(values.model.name);
      const { fileIds, model, outputFileName, ...otherFields } = values;
      imageGenerate({
        fileIds,
        template: model.template,
        outputFileName,
        options: {
          ...defaultOptions,
          ...otherFields,
        },
      });
    },
    [imageGenerate],
  );

  return {
    formMethods,
    currentModelName,
    setCurrentModelName,
    downloadPlaceholderCount,
    uploadIds,
    clearUploadIds,
    isPendingGenerate,
    onChangeUpload,
    onSubmit,
  };
}
