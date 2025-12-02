import {
  GeneratedPreview,
  type GeneratedPreviewProps,
} from './generated-preview';
import { Display } from '@common/components/display';
import { Text } from '@common/components/text';

export type GeneratedImageListProps = {
  list: GeneratedPreviewProps[];
};

export const GeneratedImageList = ({ list }: GeneratedImageListProps) => {
  return (
    <Display type="flex" direction="column">
      <h3>Images générées</h3>
      {list.length <= 0 ? (
        <Text>
          Générez une ou plusieurs images pour qu'elles apparaissent ici.
        </Text>
      ) : (
        <Display type="flex" wrap>
          {list.map(image => (
            <GeneratedPreview {...image} key={image.url} />
          ))}
        </Display>
      )}
    </Display>
  );
};
