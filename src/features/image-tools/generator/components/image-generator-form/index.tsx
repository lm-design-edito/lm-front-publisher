import { useImageGeneratorForm } from './use-image-generator-form';
import { useSelectedModelForm } from './use-selected-model-form';
import { FormProvider } from 'react-hook-form';
import { ModelSelectionSection } from './model-selection-section';
import { ImageSelectionSection } from './image-selection-section';
import { Form } from '@common/components/forms';

import './style.css';
import { useMemo } from 'react';

type ImageGeneratorForm = {
  onGenerated: (image: { url: string; mimeType: string; name: string }) => void;
};

const NB_MAX_IMAGE_SELECTION = 3;

const OUTPUT_FORMATS = [
  { label: 'JPG', value: 'jpg' },
  { label: 'PNG', value: 'png' },
  { label: 'WEBP', value: 'webp' },
];

export const ImageGeneratorForm = ({ onGenerated }: ImageGeneratorForm) => {
  const {
    formMethods,
    currentModelName,
    setCurrentModelName,
    downloadPlaceholderCount,
    uploadIds,
    clearUploadIds,
    isPendingGenerate,
    onChangeUpload,
    onSubmit,
  } = useImageGeneratorForm(onGenerated);

  const { formState, register, handleSubmit, control } = formMethods;
  const errors = useMemo(() => formState.errors, [formState.errors]);

  useSelectedModelForm({
    formMethods,
    currentModelName,
    setCurrentModelName,
  });

  return (
    <FormProvider {...formMethods}>
      <Form className="image-generator-form" onSubmit={handleSubmit(onSubmit)}>
        <ImageSelectionSection
          control={formMethods.control}
          errors={errors}
          uploadIds={uploadIds}
          downloadPlaceholderCount={downloadPlaceholderCount}
          onChangeUpload={onChangeUpload}
          onClearedCacheUploadIds={clearUploadIds}
          maxSelection={NB_MAX_IMAGE_SELECTION}
        />
        <ModelSelectionSection
          control={control}
          errors={errors}
          currentModelName={currentModelName}
        />
        <Form.Input
          label="Nom de sortie du fichier (Optionnel)"
          labelProps={{ htmlFor: 'outputFileName' }}
          inputProps={{
            type: 'text',
            placeholder: 'nom_image_generee',
            ...register('outputFileName'),
          }}
          helperProps={{
            text: "Par défaut un nom est généré automatiquement. Le nom choisi ne peut pas contenir d'espaces ou de caractères spéciaux.",
            size: 'sm',
            position: 'left',
          }}
          className="lm-publisher-w-100"
        />
        <Form.RadioGroup
          label="Format de sortie"
          defaultValue="jpg"
          inputGroupProps={OUTPUT_FORMATS.map(outputFormat => ({
            id: `format-${outputFormat.value}`,
            label: outputFormat.label,
            labelProps: {
              htmlFor: `format-input-${outputFormat.value}`,
            },
            inputProps: {
              id: `format-input-${outputFormat.value}`,
              value: outputFormat.value,
              ...register('outputFormat'),
            },
          }))}
          /* @ts-expect-error: todo */
          error={errors['outputFormat']?.message as string | undefined}
        />
        <Form.Footer>
          <Form.Submit
            isLoading={isPendingGenerate}
            disabled={isPendingGenerate}
          >
            Génerer
          </Form.Submit>
        </Form.Footer>
      </Form>
    </FormProvider>
  );
};
