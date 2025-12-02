import { useCallback } from 'react';
import { IMAGE_UPLOAD_IDS_CACHE } from '../config';
export function useClearImageUploadIdsCache() {
  const clearImageUploadIdsCache = useCallback(
    ({ onSuccess }: { onSuccess?: () => void }) => {
      localStorage.removeItem(IMAGE_UPLOAD_IDS_CACHE);
      if (onSuccess) {
        onSuccess();
      }
    },
    [],
  );

  return {
    clearImageUploadIdsCache,
  };
}
