import { Button, type ButtonProps } from '@common/components/buttons/button';
import { useToastContext } from '@common/hooks/useToastContext';
import { useImageThumbsUploadEmptyCache } from '../../api/use-image-thumbs-upload-empty-cache';
import {
  FormHelper,
  type FormHelperProps,
} from '@common/components/forms/form-helper';
import { Display } from '@common/components/display';

type ImageUploadEmptyCacheButtonProps = {
  className?: string;
  buttonProps?: ButtonProps;
  helperProps?: Omit<FormHelperProps, 'text'>;
};

export const ImageUploadEmptyCacheButton = ({
  buttonProps,
  helperProps,
  className = '',
}: ImageUploadEmptyCacheButtonProps) => {
  const { showToast } = useToastContext();
  const { emptyThumbsUploadCache } = useImageThumbsUploadEmptyCache();

  return (
    <Display type="flex" align="center" gap={1} className={className}>
      <Button
        {...buttonProps}
        onClick={() => {
          emptyThumbsUploadCache({
            onSuccess: () => {
              showToast({
                type: 'success',
                message: 'Le cache des uploads a bien été vidé',
              });
            },
          });
        }}
        variant="secondary"
      >
        Vider le cache des uploads
      </Button>
      <FormHelper
        text="Votre cache se vide automatiquement toutes les 15minutes mais vous
        pouvez choisir de le forcer manuellement."
        position="bottom-right"
        {...helperProps}
      />
    </Display>
  );
};
