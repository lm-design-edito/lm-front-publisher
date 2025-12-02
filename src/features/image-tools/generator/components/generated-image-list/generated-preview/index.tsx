import { Badge } from '@common/components/badge';
import { Display } from '@common/components/display';
import { Text } from '@common/components/text';
import './style.css';

export type GeneratedPreviewProps = {
  name: string;
  url: string;
  isNew?: boolean;
};

export const GeneratedPreview = ({
  name,
  url,
  isNew,
}: GeneratedPreviewProps) => {
  return (
    <Display
      type="flex"
      direction="column"
      className="generated-preview"
      gap="1"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="generated-preview__image"
      >
        {isNew && <Badge>Nouveau</Badge>}
        <img src={url} alt="" />
      </a>
      <Display
        type="flex"
        align="center"
        direction="column"
        gap="1"
        className="generated-preview__content"
      >
        <Text className="generated-preview__name" size="sm">
          {name}
        </Text>
        <a href={url} target="_blank" download={name}>
          Télécharger
        </a>
      </Display>
    </Display>
  );
};
