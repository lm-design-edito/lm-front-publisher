import { Form } from '@common/components/forms';
import { Button } from '@common/components/buttons/button';
import { Display } from '@common/components/display';
import { TinyLMGFitOptions } from '../../../config';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { TinyLMGFormSchemaValues } from '../schema';

type Props = {
  register: UseFormRegister<TinyLMGFormSchemaValues>;
  errors: FieldErrors<TinyLMGFormSchemaValues>;
  fit: string;
  onKeepOriginalDimensions: () => void;
};

export const DimensionsSection = ({
  register,
  errors,
  fit,
  onKeepOriginalDimensions,
}: Props) => {
  return (
    <Form.Fieldset legend="Dimensions">
      <Display
        type="flex"
        direction="row"
        justify="space-between"
        align="center"
        className="dimensions-inputs"
      >
        <Form.Input
          label="Largeur"
          labelProps={{ htmlFor: 'width' }}
          inputProps={{
            id: 'width',
            type: 'number',
            min: 1,
            ...register('width', { valueAsNumber: true }), // ✅ Ajoute valueAsNumber
          }}
          error={errors.width}
        />
        <span className="dimensions-separator">×</span>
        <Form.Input
          label="Hauteur"
          labelProps={{ htmlFor: 'height' }}
          inputProps={{
            id: 'height',
            type: 'number',
            min: 1,
            ...register('height', { valueAsNumber: true }), // ✅ Ajoute valueAsNumber
          }}
          error={errors.height}
        />
        <Button
          type="button"
          variant="secondary"
          size="s"
          onClick={onKeepOriginalDimensions}
        >
          Garder les dimensions d'origine
        </Button>
      </Display>

      <Form.Select
        label="Mode de redimensionnement"
        options={TinyLMGFitOptions}
        className="lm-publisher-m-t-spacer-3"
        helperProps={{
          position: 'left',
          text: TinyLMGFitOptions.find(option => option.value === fit)
            ?.description,
        }}
        selectProps={{
          id: 'fit',
          ...register('fit'),
        }}
        error={errors.fit}
      />
    </Form.Fieldset>
  );
};
