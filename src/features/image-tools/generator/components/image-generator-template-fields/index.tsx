import { FormInput } from '@common/components/forms/form-input';
import { useCallback, useEffect, useRef } from 'react';
import {
  Controller,
  useFormContext,
  type FieldError,
  type FieldErrors,
} from 'react-hook-form';
import type { TemplateConfigField } from '../../config/template-config-fields';

type ConfigFieldName = string;

export type Props = {
  templateName?: string;
  configFields: TemplateConfigField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;

  errors: FieldErrors<Record<ConfigFieldName, unknown>>;
};

export const ImageGeneratorTemplateFields = ({
  templateName = '',
  configFields,
  control,
  errors,
}: Props) => {
  const currentFieldNames = useRef<ConfigFieldName[]>([]);
  const { unregister } = useFormContext();

  const unregisterCurrentFields = useCallback(() => {
    if (currentFieldNames.current.length) {
      const fieldsToUnregister = currentFieldNames.current;
      unregister(fieldsToUnregister as string[]);
    }
  }, [unregister]);

  useEffect(() => {
    unregisterCurrentFields();
    currentFieldNames.current = configFields
      ? configFields.map(field => field.name)
      : [];

    return () => {
      unregisterCurrentFields();
    };
  }, [configFields, templateName, unregisterCurrentFields]);

  return (
    <>
      {configFields.map(field => (
        <Controller
          key={`${templateName}-${field.name}`} // Key unique pour forcer le re-render
          name={field.name}
          control={control}
          /* @ts-expect-error: dynamic fields */
          render={({ field: { onChange, value } }) => {
            switch (field.type) {
              case 'input':
                return (
                  <FormInput
                    {...field.properties}
                    inputProps={{
                      ...field.properties.inputProps,
                      id: field.name,
                      value: value || '',
                      onChange,
                    }}
                    error={errors[field.name] as FieldError}
                  />
                );
              default:
                return null;
            }
          }}
        />
      ))}
    </>
  );
};
