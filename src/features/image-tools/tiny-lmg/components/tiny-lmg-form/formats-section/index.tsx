import { Form } from '@common/components/forms';
import { Button } from '@common/components/buttons/button';
import { TinyLMGFormats } from '../../../config';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { TinyLMGFormSchemaValues } from '../schema';

type Props = {
  register: UseFormRegister<TinyLMGFormSchemaValues>;
  errors: FieldErrors<TinyLMGFormSchemaValues>;
  onSelectAllFormats: () => void;
};

export const FormatsSection = ({
  register,
  errors,
  onSelectAllFormats,
}: Props) => {
  return (
    <Form.CheckboxGroup
      label="Formats de sortie"
      inputGroupProps={TinyLMGFormats.map(format => ({
        id: `format-${format.value}`,
        label: format.label,
        labelProps: {
          htmlFor: `format-input-${format.value}`,
        },
        inputProps: {
          id: `format-input-${format.value}`,
          value: format.value,
          ...register('formats'),
        },
      }))}
      error={errors.formats}
    >
      <Button
        variant="secondary"
        size="s"
        className="lm-publisher-m-t-spacer"
        type="button"
        onClick={onSelectAllFormats}
      >
        Tout sélectionner / désélectionner
      </Button>
    </Form.CheckboxGroup>
  );
};
