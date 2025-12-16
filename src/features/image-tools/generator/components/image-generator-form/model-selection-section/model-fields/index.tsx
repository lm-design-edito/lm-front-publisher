import { Controller, type FieldError, type FieldErrors } from 'react-hook-form';
import type { ModelConfigField } from '../../../../config/model-config-fields';
import { Text } from '@common/components/text';
import { Form } from '@common/components/forms';
import { useCallback } from 'react';

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
  const getDefaultValue = useCallback((field: ModelConfigField) => {
    switch (field.type) {
      case 'checkbox':
        if ('defaultChecked' in field && field.defaultChecked) {
          return field.defaultChecked;
        }
        break;
      default:
        if ('defaultValue' in field && field.defaultValue) {
          return field.defaultValue;
        }
        break;
    }
    return undefined;
  }, []);

  return (
    <>
      {configFields.length === 0 ? (
        <Text>Aucune option configurable avec ce modèle</Text>
      ) : (
        configFields.map(field => (
          <Controller
            key={`${modelName}-${field.name}`} // Key unique pour forcer le re-render
            name={field.name}
            control={control}
            /* @ts-expect-error: dynamic fields */
            render={({ field: { onChange, value } }) => {
              const currentValue = value ?? getDefaultValue(field);
              switch (field.type) {
                case 'input':
                  return (
                    <Form.Input
                      {...field.properties}
                      inputProps={{
                        ...field.properties.inputProps,
                        id: field.name,
                        name: field.name,
                        value: currentValue || '',
                        onChange,
                      }}
                      error={errors[field.name] as FieldError}
                    />
                  );
                case 'checkbox':
                  return (
                    <Form.Checkbox
                      {...field.properties}
                      inputProps={{
                        ...field.properties.inputProps,
                        id: field.name,
                        name: field.name,
                        // defaultChecked: field.defaultChecked,
                        checked: Boolean(currentValue),
                        onChange: e => onChange(e.target.checked),
                      }}
                      labelProps={{
                        htmlFor: field.name,
                      }}
                      error={errors[field.name] as FieldError}
                    />
                  );
                case 'radio-group':
                  return (
                    <Form.RadioGroup
                      {...field.properties}
                      label={field.properties.label}
                      inputGroupProps={field.properties.inputGroupProps.map(
                        inputProps => ({
                          ...inputProps,
                          label: inputProps.label || '',
                          labelProps: {
                            htmlFor: inputProps.id,
                          },
                          inputProps: {
                            ...inputProps.inputProps,
                            id: inputProps.id,
                            name: field.name,
                            value: inputProps.id,
                            checked: currentValue === inputProps.id,
                            onChange: () => onChange(inputProps.id), // Met à jour avec l'ID sélectionné
                          },
                        }),
                      )}
                      error={errors[field.name] as FieldError}
                    />
                  );
                case 'input-range':
                  return (
                    <Form.InputRange
                      {...field.properties}
                      inputProps={{
                        ...field.properties.inputProps,
                        id: field.name,
                        name: field.name,
                        value: currentValue || 0,
                        onChange: e => onChange(Number(e.target.value)),
                      }}
                      error={errors[field.name] as FieldError}
                    />
                  );
                case 'input-color':
                  return (
                    <Form.InputColor
                      {...field.properties}
                      inputProps={{
                        ...field.properties.inputProps,
                        id: field.name,
                        name: field.name,
                        value: currentValue || '',
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
        ))
      )}
    </>
  );
};
