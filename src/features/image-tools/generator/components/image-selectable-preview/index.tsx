import { Loader } from '@common/components/loader';
import './style.css';
import { CheckBadge } from '@common/components/check-badge';

export type ImagePlaceholderSelectablePreviewProps = {
  isPlaceholder: true;
  className?: string;
};

export type ImageSelectablePreviewProps = {
  src: string;
  alt?: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
  className?: string;
};

export const ImageSelectablePreview = (
  props: ImageSelectablePreviewProps | ImagePlaceholderSelectablePreviewProps,
) => {
  if ('isPlaceholder' in props) {
    return (
      <div
        className={`image-selectable-preview image-selectable-preview_placeholder ${props.className}`}
      >
        <Loader />
      </div>
    );
  }
  const { selected, className, onChange, src, alt } = props;
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
