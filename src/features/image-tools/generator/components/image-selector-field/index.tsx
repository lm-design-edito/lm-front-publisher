import { FieldSet } from '@common/components/forms/fieldset';
import { Icon } from '@common/components/icon';

import './style.css';

type Props = {
  test?: string;
  images?: string[];
};

export const ImageSelectorField = (props: Props) => {
  return (
    <>
      <FieldSet legend="Sélectionner une image" className="image-selector">
        {props.test}
        <div className="image-selector__selector">
          <Icon name="plus" />
          <span>Ajouter une ou plusieurs images</span>
        </div>
      </FieldSet>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <p className="text-gray-500">Sélectionner une image</p>
        {/* Implement the actual image selection logic here */}
      </div>
    </>
  );
};
