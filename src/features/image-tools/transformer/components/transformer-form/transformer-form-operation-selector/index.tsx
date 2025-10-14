import { Block } from '@common/components/block';
import { Button } from '@common/components/buttons/button';
import { FormSelect } from '@common/components/forms/form-select';
import { useCallback, useState } from 'react';

export type TransformerFormOperationSelectorProps = {
  options: { value: string; label: string }[];
  onSelect: (operation: string) => void;
};

export const TransformerFormOperationSelector = ({
  onSelect,
  options,
}: TransformerFormOperationSelectorProps) => {
  const [operationSelected, setOperationSelected] = useState<string | null>(
    options[0].value || '',
  );

  const handleSelectOperation = useCallback(() => {
    if (operationSelected) {
      console.log('setOperationSelected', operationSelected);
      onSelect(operationSelected);
    }
  }, [onSelect, operationSelected]);

  return (
    <Block type="flex" align="center">
      <FormSelect
        options={options}
        selectProps={{
          onChange: e => setOperationSelected(e.target.value),
        }}
      />
      <Button type="button" variant="secondary" onClick={handleSelectOperation}>
        Ajouter une opération (todo)
      </Button>
    </Block>
  );
};
