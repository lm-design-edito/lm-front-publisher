import { useCallback } from 'react';
import { useSystemStatusCheck } from '@features/system/services/use-system-status-check';
import { useToastContext } from '@common/hooks/useToastContext';

const SystemStatusToaster = {
  UNHEALTHY: 'system-unhealthy-toaster',
  RECOVERED: 'system-recovered-toaster',
} as const;

export const useSystemStatusChangeToaster = () => {
  const { showToast, hideToast } = useToastContext();

  const onStatusChange = useCallback(
    ({ isHealthy }: { isHealthy: boolean }) => {
      if (!isHealthy) {
        hideToast(SystemStatusToaster.RECOVERED);
        showToast({
          id: SystemStatusToaster.UNHEALTHY,
          message: 'Le serveur rencontre des problèmes.',
          icon: 'danger',
          duration: 5000,
          description: (
            <>
              Certaines fonctionnalités peuvent être dégradées ou indisponibles.
              Nous travaillons à résoudre le problème.
            </>
          ),
          type: 'error',
          // duration: 0,
        });
        return;
      }
      hideToast(SystemStatusToaster.UNHEALTHY);
      showToast({
        id: SystemStatusToaster.RECOVERED,
        message: 'Le serveur est de nouveau opérationnel.',
        description: <></>,
        type: 'success',
        duration: 5000,
      });
    },
    [showToast, hideToast],
  );

  useSystemStatusCheck({
    onStatusChange: onStatusChange,
  });
};
