import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { Display } from '@common/components/display';
import { Text } from '@common/components/text';
import { ModelSelector } from './model-selector';
import { ModelFields } from './model-fields';
import { ModelList } from '../../../config/models';
import { getModelConfigFields } from '../../../utils/get-model-config-fields';
import { Form } from '@common/components/forms';

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
      contentClassName="image-generator-form__model-fieldset"
    >
      <Controller
        name="model"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ModelSelector
            modelList={ModelList}
            selectedModel={value}
            onSelectModel={onChange}
            error={errors['model']}
          />
        )}
      />
      <Display type="flex" direction="column">
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
