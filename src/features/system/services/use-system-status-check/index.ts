import { api } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const refetchInterval = 5 * 60 * 1000; // 5 minutes

export type useSystemStatusCheckProps = {
  onStatusChange?: (data: { isHealthy: boolean }) => void;
};

export function useSystemStatusCheck(props?: useSystemStatusCheckProps) {
  const { onStatusChange } = props || {};
  const isPreviousHealthy = useRef<boolean>(true);
  const { isSuccess, data, isLoading } = useQuery({
    queryKey: ['system-status-check'],
    retry: 3,
    refetchInterval: refetchInterval,
    queryFn: async () => api.queries.system.statusCheck(),
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const wasPreviousHealthy = isPreviousHealthy.current;
    isPreviousHealthy.current =
      data && data.success ? data.payload.isHealthy : false;
    const hasChanged = wasPreviousHealthy !== isPreviousHealthy.current;

    if (onStatusChange && hasChanged) {
      onStatusChange({ isHealthy: isPreviousHealthy.current || false });
    }
  }, [isLoading, isSuccess, data, onStatusChange]);

  return {
    isLoading,
    isHealthy: isSuccess && 'payload' in data ? data.payload.isHealthy : false,
  };
}
