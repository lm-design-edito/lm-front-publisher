import { Form } from '@common/components/forms';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { TinyLMGFormSchemaValues } from '../schema';
import { Display } from '@common/components/display';

type Props = {
  register: UseFormRegister<TinyLMGFormSchemaValues>;
  errors: FieldErrors<TinyLMGFormSchemaValues>;
};

export const CompressionSection = ({ register, errors }: Props) => {
  return (
    <Form.Fieldset legend="Compression" contentClassName="lm-publisher-w-100">
      <Display type="flex" direction="column" gap={2}>
        <Form.Input
          label="Qualité (1-100)"
          labelProps={{ htmlFor: 'quality' }}
          helperProps={{
            text: 'Qualité de sortie pour les formats JPEG et WebP',
          }}
          inputProps={{
            id: 'quality',
            type: 'number',
            min: 1,
            max: 100,
            defaultValue: 100,
            ...register('quality', { valueAsNumber: true }),
          }}
          error={errors.quality}
        />

        <Form.Input
          label="Niveau de compression PNG (0-90)"
          labelProps={{ htmlFor: 'compressionLevel' }}
          helperProps={{
            text: 'Niveau de compression pour le format PNG uniquement (0 = aucune, 90 = maximale)',
          }}
          inputProps={{
            id: 'compressionLevel',
            type: 'number',
            min: 0,
            max: 90,
            defaultValue: 90,
            ...register('compressionLevel', { valueAsNumber: true }), // ✅ Ajoute valueAsNumber
          }}
          error={errors.compressionLevel}
        />
      </Display>
    </Form.Fieldset>
  );
};
