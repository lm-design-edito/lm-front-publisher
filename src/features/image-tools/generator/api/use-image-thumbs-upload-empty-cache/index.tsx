import { useCallback } from 'react';
import { STORAGE_KEY } from '../config';

export function useImageThumbsUploadEmptyCache() {
  const emptyThumbsUploadCache = useCallback(
    ({ onSuccess }: { onSuccess?: () => void }) => {
      localStorage.removeItem(STORAGE_KEY);
      if (onSuccess) {
        onSuccess();
      }
    },
    [],
  );

  return {
    emptyThumbsUploadCache,
  };
}
