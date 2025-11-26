import { Button } from '@common/components/buttons/button';
import { useToastContext } from '@common/hooks/useToastContext';
import { useImageThumbsUploadEmptyCache } from '../../api/use-image-thumbs-upload-empty-cache';

type LogoutButtonProps = {
  size?: 's' | 'm' | 'l';
};

export const ImageUploadEmptyCacheButton = ({ size }: LogoutButtonProps) => {
  const { showToast } = useToastContext();
  const { emptyThumbsUploadCache } = useImageThumbsUploadEmptyCache();

  return (
    <Button
      size={size}
      onClick={() => {
        emptyThumbsUploadCache({
          onSuccess: () => {
            showToast({
              type: 'success',
              message: 'Le cache des upload a bien été vidé',
            });
          },
        });
      }}
      variant="secondary"
    >
      Vider le cache des uploads
    </Button>
  );
};
