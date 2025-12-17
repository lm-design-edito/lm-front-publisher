import { useEffect, useCallback } from 'react';
import { getModelConfigFields } from '../../utils/get-model-config-fields';
import type { UseFormReturn } from 'react-hook-form';

export function useSelectedModelForm({
  formMethods,
  currentModelName,
  setCurrentModelName,
}: {
  formMethods: UseFormReturn;
  currentModelName?: string;
  setCurrentModelName: (name: string) => void;
}) {
  const { watch, unregister, getValues, reset } = formMethods;
  const model = watch('model');

  const onUnregister = useCallback(
    (fieldNames: string[]) => {
      fieldNames.forEach(field => unregister(field));
    },
    [unregister],
  );

  useEffect(() => {
    if (model?.name && model.name !== currentModelName) {
      const currentValues = getValues();

      if (currentModelName) {
        const oldFields = getModelConfigFields(currentModelName);
        onUnregister(oldFields.map(field => field.name));
      }

      setCurrentModelName(model.name);

      reset({
        model: currentValues.model,
        fileIds: currentValues.fileIds,
        outputFileName: currentValues.outputFileName,
        outputFormat: currentValues.outputFormat,
      });
    }
  }, [
    model,
    currentModelName,
    getValues,
    reset,
    onUnregister,
    setCurrentModelName,
  ]);
}
