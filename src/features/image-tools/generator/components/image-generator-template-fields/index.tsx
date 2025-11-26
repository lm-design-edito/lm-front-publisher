import { FormInput } from '@common/components/forms/form-input';
import { Controller, type FieldError, type FieldErrors } from 'react-hook-form';
import type { TemplateConfigField } from '../../config/template-config-fields';
import { FormInputCheckbox } from '@common/components/forms/form-input-checkbox';
import { Text } from '@common/components/text';
import { FormInputRadioGroup } from '@common/components/forms/form-input-radio-group';

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
  return (
    <>
      {configFields.length === 0 ? (
        <Text>Aucune option configurable avec ce modèle</Text>
      ) : (
        configFields.map(field => (
          <Controller
            key={`${templateName}-${field.name}`} // Key unique pour forcer le re-render
            name={field.name}
            control={control}
            {...('defaultValue' in field
              ? { defaultValue: field.defaultValue }
              : undefined)}
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
                case 'checkbox':
                  return (
                    <FormInputCheckbox
                      {...field.properties}
                      inputProps={{
                        ...field.properties.inputProps,
                        id: field.name,
                        // defaultChecked: field.defaultChecked,
                        checked: Boolean(value),
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
                    <FormInputRadioGroup
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
                            checked: value === inputProps.id,
                            onChange: () => onChange(inputProps.id), // Met à jour avec l'ID sélectionné
                          },
                        }),
                      )}
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
