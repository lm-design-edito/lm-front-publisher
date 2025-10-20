import './style.css';
import { CheckBadge } from '@common/components/check-badge';

export type ImageSelectablePreviewProps = {
  src: string;
  alt?: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
  className?: string;
};

export const ImageSelectablePreview = ({
  src,
  alt,
  selected,
  className,
  onChange,
}: ImageSelectablePreviewProps) => {
  return (
    <div
      className={`image-selectable-preview ${selected ? ' image-selectable-preview_selected' : ''} ${className}`}
      onClick={() => onChange(!selected)}
    >
      <CheckBadge className="image-selectable-preview__badge" />
      <img src={src} alt={alt} />
    </div>
  );
};
