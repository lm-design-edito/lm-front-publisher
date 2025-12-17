import type { CustomModelConfigField } from '@features/image-tools/generator/config';
import { useMemo } from 'react';
import { useWatch, type Control, type FieldValues } from 'react-hook-form';

export const ModelCustomField = ({
  field,
  control,
}: {
  field: CustomModelConfigField;
  control: Control<FieldValues>;
}) => {
  const watchedValues = useWatch({
    control,
    name: field.dependencies || [],
  });
  const values = useMemo(() => {
    if (!field.dependencies || field.dependencies.length === 0) {
      return {};
    }

    return field.dependencies.reduce(
      (acc, key, index) => {
        acc[key] = watchedValues[index];
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }, [field.dependencies, watchedValues]);

  return <>{field.render(values)}</>;
};

ModelCustomField.displayName = 'ModelCustomField';
