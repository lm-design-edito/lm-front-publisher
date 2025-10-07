import { FormInput } from '@common-components/forms/form-input';
import type { FieldError } from 'react-hook-form';

// const Operations = [
//   {
//     name: 'blur',
//     label: 'Flou',
//   },
//   {
//     name: 'sharpen',
//     label: 'Affiner',
//   },
//   {
//     name: 'brightness',
//     label: 'Luminosité',
//   },
// ];

interface TransformerFormOperationFieldProps {
  name: string;
  fieldProps: any; // TODO: type properly
  error?: FieldError;
}

export const TransformerFormOperationField = ({
  name,
  error,
  fieldProps,
}: TransformerFormOperationFieldProps) => {
  switch (name) {
    case 'blur':
      return (
        <FormInput
          label="Blur"
          labelProps={{ htmlFor: 'blur.sigma' }}
          inputProps={{
            id: 'blur.sigma',
            type: 'number',
            min: 1,
            max: 100,
            defaultValue: 100,
            ...fieldProps,
          }}
          error={error}
        />
      );
  }
  return <></>
};
