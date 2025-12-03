import { useTinyLMGForm } from './use-tiny-lmg-form';
import { ImageUploadSection } from './image-upload-section';
import { DimensionsSection } from './dimensions-section';
import { FormatsSection } from './formats-section';
import { CompressionSection } from './compression-section';
import { Form } from '@common/components/forms';
import type { DownloadItem } from '../types';
import './style.css';

interface TinyLMGFormProps {
  onDownloadReady: (downloads: DownloadItem[]) => void;
}

export const TinyLMGForm = ({ onDownloadReady }: TinyLMGFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    errors,
    imgPreview,
    isPending,
    fit,
    onChangeImage,
    onKeepOriginalDimensions,
    onSelectAllFormats,
    onSubmit,
  } = useTinyLMGForm(onDownloadReady);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ImageUploadSection
        control={control}
        errors={errors}
        imgPreview={imgPreview}
        onChangeImage={onChangeImage}
      />

      <DimensionsSection
        register={register}
        errors={errors}
        fit={fit}
        onKeepOriginalDimensions={onKeepOriginalDimensions}
      />

      <FormatsSection
        register={register}
        errors={errors}
        onSelectAllFormats={onSelectAllFormats}
      />

      <CompressionSection register={register} errors={errors} />

      <Form.Footer>
        <Form.Submit isLoading={isPending} disabled={isPending}>
          Compresser
        </Form.Submit>
      </Form.Footer>
    </Form>
  );
};
