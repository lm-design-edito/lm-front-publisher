import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { Display } from '@common/components/display';
import { Text } from '@common/components/text';
import { ModelSelector } from './model-selector';
import { ModelFields } from './model-fields';
import { getModelConfigFields } from '../../../utils/get-model-config-fields';
import { Form } from '@common/components/forms';
import './style.css';
import { ModelListMetadata } from '@features/image-tools/generator/config';

type Props = {
  control: Control;
  errors: FieldErrors;
  currentModelName?: string;
};

export const ModelSelectionSection = ({
  control,
  errors,
  currentModelName,
}: Props) => {
  const modelConfigFields = getModelConfigFields(currentModelName);
  return (
    <Form.Fieldset
      legend="Choix du modèle"
      className="model-selection-section"
      contentClassName="model-selection-section__content"
    >
      <Controller
        name="model"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ModelSelector
            modelList={ModelListMetadata}
            selectedModel={value}
            onSelectModel={onChange}
            error={errors['model']}
          />
        )}
      />
      <Display
        type="flex"
        direction="column"
        className="model-selection-section__model-fields"
        gap="1"
      >
        <Text className="lmui-form__placeholder form-label">
          Options du modèle
        </Text>

        {currentModelName ? (
          <ModelFields
            modelName={currentModelName}
            configFields={modelConfigFields}
            control={control}
            errors={errors}
          />
        ) : (
          <Text>Sélectionnez un modèle pour choisir ses options.</Text>
        )}
      </Display>
    </Form.Fieldset>
  );
};
