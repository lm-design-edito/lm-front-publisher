import { Button, type ButtonProps } from '@common/components/buttons/button';
import { useToastContext } from '@common/hooks/useToastContext';
import { useClearImageUploadIdsCache } from '../../services/use-clear-image-upload-ids-cache';
import { Display } from '@common/components/display';
import { Helper, type HelperProps } from '@common/components/helper';

type ClearImageUploadIdsCacheButtonProps = {
  className?: string;
  buttonProps?: ButtonProps;
  helperProps?: Omit<HelperProps, 'text'>;
  onCleared?: () => void;
};

export const ClearImageUploadIdsCacheButton = ({
  buttonProps,
  helperProps,
  onCleared,
  className = '',
}: ClearImageUploadIdsCacheButtonProps) => {
  const { showToast } = useToastContext();
  const { clearImageUploadIdsCache } = useClearImageUploadIdsCache();

  return (
    <Display type="flex" align="center" gap={1} className={className}>
      <Button
        {...buttonProps}
        role="button"
        onClick={() => {
          clearImageUploadIdsCache({
            onSuccess: () => {
              showToast({
                type: 'success',
                message: 'Le cache des uploads a bien été vidé',
              });

              if (onCleared) {
                onCleared();
              }
            },
          });
        }}
        variant="secondary"
      >
        Vider le cache des uploads
      </Button>
      <Helper
        text="Votre cache se vide automatiquement toutes les 15minutes mais vous
        pouvez choisir de le forcer manuellement."
        position="bottom-right"
        {...helperProps}
      />
    </Display>
  );
};
