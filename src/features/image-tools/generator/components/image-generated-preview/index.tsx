import { Badge } from '@common/components/badge';
import './style.css';
import { Display } from '@common/components/display';

export type ImageGeneratedPreviewProps = {
  name: string;
  url: string;
  isNew?: boolean;
};

export const ImageGeneratedPreview = ({
  name,
  url,
  isNew,
}: ImageGeneratedPreviewProps) => {
  return (
    <Display
      type="flex"
      direction="column"
      className="image-generated-preview"
      gap="1"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="image-generated-preview__image"
      >
        {isNew && <Badge>Nouveau</Badge>}
        <img src={url} alt="" />
      </a>
      <Display type="flex" align="center" direction="column" gap="1">
        <a href={url} target="_blank" download={name}>
          Télécharger
        </a>
      </Display>
    </Display>
  );
};
