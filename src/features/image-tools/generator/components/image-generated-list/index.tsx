import { OverflowList } from '@common/components/overflow-list';
import {
  ImageGeneratedPreview,
  type ImageGeneratedPreviewProps,
} from '../image-generated-preview';
import { Display } from '@common/components/display';
import { Text } from '@common/components/text';

export type ImageGeneratedListProps = {
  list: ImageGeneratedPreviewProps[];
};

export const ImageGeneratedList = ({ list }: ImageGeneratedListProps) => {
  return (
    <Display type="flex" direction="column">
      <h3>Images générées</h3>
      {list.length <= 0 ? (
        <Text>
          Générez une ou plusieurs images pour qu'elles apparaissent ici.
        </Text>
      ) : (
        <OverflowList>
          {list.map(image => (
            <ImageGeneratedPreview {...image} key={image.url} />
          ))}
        </OverflowList>
      )}
    </Display>
  );
};
