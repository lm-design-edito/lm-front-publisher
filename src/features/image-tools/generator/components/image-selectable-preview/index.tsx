import { Icon } from '@common/components/icon';
import './style.css';

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
      <span className="image-selectable-preview__badge">
        <Icon name={'check'} color="forced-white" />
      </span>
      <img src={src} alt={alt} />
    </div>
  );
};
