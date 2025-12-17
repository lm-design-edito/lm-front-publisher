import { type FieldErrors } from 'react-hook-form';
import type { ModelConfigField } from '@features/image-tools/generator/config/models/types';
import { Text } from '@common/components/text';
import { ModelRenderedField } from './model-rendered-field';

type ConfigFieldName = string;

export type Props = {
  modelName?: string;
  configFields: ModelConfigField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;

  errors: FieldErrors<Record<ConfigFieldName, unknown>>;
};

export const ModelFields = ({
  modelName = '',
  configFields,
  control,
  errors,
}: Props) => {
  return (
    <>
      {configFields.length === 0 ? (
        <Text>Aucune option configurable avec ce modèle</Text>
      ) : (
        configFields.map((field, index) => (
          <ModelRenderedField
            modelName={modelName}
            key={`${modelName}.${field.name}.${index}`}
            field={field}
            control={control}
            errors={errors}
          />
        ))
      )}
    </>
  );
};
