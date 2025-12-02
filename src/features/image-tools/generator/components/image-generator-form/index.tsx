import { useImageGeneratorForm } from './use-image-generator-form';
import { useSelectedModelForm } from './use-selected-model-form';
import { FormProvider } from 'react-hook-form';
import { ModelSelectionSection } from './model-selection-section';
import { ImageSelectionSection } from './image-selection-section';
import { Display } from '@common/components/display';
import { Form } from '@common/components/forms';

import './style.css';

type ImageGeneratorForm = {
  onGenerated: (image: { url: string; mimeType: string; name: string }) => void;
};

const NB_MAX_IMAGE_SELECTION = 3;

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
          errors={formState.errors}
          uploadIds={uploadIds}
          downloadPlaceholderCount={downloadPlaceholderCount}
          onChangeUpload={onChangeUpload}
          onClearedCacheUploadIds={clearUploadIds}
          maxSelection={NB_MAX_IMAGE_SELECTION}
        />
        <ModelSelectionSection
          control={control}
          errors={formState.errors}
          currentModelName={currentModelName}
        />
        <Display type="flex" align="center">
          <Form.Input
            label="Nom de sortie du fichier (Optionnel)"
            labelProps={{ htmlFor: 'outputFileName' }}
            inputProps={{
              type: 'text',
              placeholder: 'nom_image_generee',
              ...register('outputFileName'),
            }}
            className="lm-publisher-w-100"
          />
          <Form.Helper
            text="Par défaut un nom est généré automatiquement. Le nom choisi ne peut pas contenir d'espaces ou de caractères spéciaux."
            size="sm"
          />
        </Display>

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
