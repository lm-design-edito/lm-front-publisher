import { useCallback, useEffect } from 'react';
import { useSystemStatusCheck } from '@features/system/services/use-system-status-check';
import { useToastContext } from '@common/hooks/useToastContext';
import { Toaster } from '@features/system/config';

export const useSystemStatusChangeToaster = () => {
  const { showToast, hideToast, hideAllToasts } = useToastContext();

  const onStatusChange = useCallback(
    ({ isHealthy }: { isHealthy: boolean }) => {
      if (!isHealthy) {
        hideToast(Toaster.SYSTEM_STATUS_RECOVERED);
        showToast({
          id: Toaster.SYSTEM_STATUS_ISSUE,
          groupId: Toaster.Groups.SYSTEM_STATUS,
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
      hideToast(Toaster.SYSTEM_STATUS_ISSUE);
      showToast({
        id: Toaster.SYSTEM_STATUS_RECOVERED,
        groupId: Toaster.Groups.SYSTEM_STATUS,
        message: 'Le serveur est de nouveau opérationnel.',
        description: <></>,
        type: 'success',
        duration: 5000,
      });
    },
    [showToast, hideToast],
  );

  useEffect(() => {
    return () => {
      hideAllToasts(Toaster.Groups.SYSTEM_STATUS);
    };
  }, [hideAllToasts]);

  useSystemStatusCheck({
    onStatusChange: onStatusChange,
  });
};
