import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImageMultiFormat } from '../../services/use-image-multi-format';
import { useToastContext } from '@common/hooks/useToastContext';
import { Logger } from '@utils/logger';
import {
  TinyLMGFormatsValues,
  tinyLMGFormSchema,
  type TinyLMGFormSchemaValues,
} from './schema';

type ImagePreview = {
  name: string | null;
  url: string | null;
};

type ImageDimensions = {
  width: number;
  height: number;
};

type DownloadItem = {
  name: string;
  url: string;
  sourceName: string;
  mimeType: string;
  date: Date;
  quality: number;
  dimensions: ImageDimensions;
};

export function useTinyLMGForm(
  onDownloadReady: (downloads: DownloadItem[]) => void,
) {
  const { showToast } = useToastContext();
  const [imgPreview, setImgPreview] = useState<ImagePreview>({
    name: null,
    url: null,
  });
  const [inputImageDimensions, setInputImageDimensions] =
    useState<ImageDimensions>({
      width: 0,
      height: 0,
    });

  const formMethods = useForm<TinyLMGFormSchemaValues>({
    resolver: zodResolver(tinyLMGFormSchema),
  });

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = formMethods;

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

  const getFormImageDimensions = useCallback(
    (files: FileList): Promise<ImageDimensions> => {
      return new Promise(resolve => {
        setValue('image', files[0]);
        if (!files || !files.length) {
          resolve({ width: 0, height: 0 });
          return;
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
    },
    [setValue],
  );

  const applyDimensionsFormValues = useCallback(
    (width: number, height: number) => {
      setValue('width', width);
      setValue('height', height);
    },
    [setValue],
  );

  const onChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [getFormImageDimensions, applyDimensionsFormValues],
  );

  const onKeepOriginalDimensions = useCallback(() => {
    applyDimensionsFormValues(
      inputImageDimensions.width,
      inputImageDimensions.height,
    );
  }, [inputImageDimensions, applyDimensionsFormValues]);

  const onSelectAllFormats = useCallback(() => {
    const currentFormats = getValues('formats');
    if (currentFormats.length === TinyLMGFormatsValues.length) {
      setValue('formats', []);
    } else {
      setValue('formats', TinyLMGFormatsValues);
    }
  }, [getValues, setValue]);

  const onSubmit = useCallback(
    async (data: TinyLMGFormSchemaValues) => {
      imageMultiFormat({
        width: data.width,
        height: data.height,
        formats: data.formats,
        fit: data.fit,
        quality: data.quality ?? 100,
        compressionLevel: data.compressionLevel
          ? Math.round(data.compressionLevel / 10)
          : 9,
        file: data.image,
      });
    },
    [imageMultiFormat],
  );

  const fit = watch('fit');

  return {
    // Form methods
    control,
    register,
    handleSubmit,
    errors,

    // State
    imgPreview,
    inputImageDimensions,
    isPending,
    fit,

    // Handlers
    onChangeImage,
    onKeepOriginalDimensions,
    onSelectAllFormats,
    onSubmit,
  };
}
