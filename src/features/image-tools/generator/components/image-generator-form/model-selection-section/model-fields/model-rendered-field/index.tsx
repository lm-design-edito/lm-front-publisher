import type { ModelConfigField } from '@features/image-tools/generator/config/models/types';
import {
  Controller,
  useWatch,
  type Control,
  type FieldError,
  type FieldErrorsImpl,
  type FieldValues,
} from 'react-hook-form';
import { ModelCustomField } from '../model-custom-field';
import { Form } from '@common/components/forms';
import { Display } from '@common/components/display';
import { useCallback } from 'react';

type ModelRenderedFieldProps = {
  field: ModelConfigField;
  modelName: string;
  control: Control<FieldValues>;
  errors?: FieldErrorsImpl<FieldValues>;
};

function useFieldVisibility(
  field: ModelConfigField,
  control: Control<FieldValues>,
): boolean {
  const conditionalValue = useWatch({
    control,
    name: field.conditional?.field || '',
    defaultValue: 'default',
  });

  if (!field.conditional) {
    return true; // Toujours visible si pas de condition
  }

  return Boolean(
    conditionalValue === field.conditional.value ||
      (conditionalValue === 'default' && field.conditional.supportDefault),
  );
}

export const ModelRenderedField = ({
  modelName,
  field,
  control,
  errors,
}: ModelRenderedFieldProps) => {
  const isVisible = useFieldVisibility(field, control);
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

  if (!isVisible) {
    return null;
  }

  if (field.type === 'custom') {
    return <ModelCustomField field={field} control={control} />;
  }
  if (field.type === 'fieldset') {
    return (
      <Form.Fieldset
        contentClassName="lm-publisher-w-100"
        {...field.properties}
      >
        <Display type="flex" direction="column" gap="1">
          {field.fields.map((nestedField, nestedIndex) => (
            <ModelRenderedField
              modelName={modelName}
              field={nestedField}
              control={control}
              key={`${modelName}-${field.name}-${nestedIndex}`}
              errors={
                errors
                  ? (errors[field.name] as Record<string, FieldError>)
                  : undefined
              }
            />
          ))}
        </Display>
      </Form.Fieldset>
    );
  }
  return (
    <Controller
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
                error={errors?.[field.name] as FieldError}
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
                error={errors?.[field.name] as FieldError}
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
                error={errors?.[field.name] as FieldError}
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
                error={errors?.[field.name] as FieldError}
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
                error={errors?.[field.name] as FieldError}
              />
            );
          default:
            return null;
        }
      }}
    />
  );
};
