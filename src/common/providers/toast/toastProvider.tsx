import { useCallback, useState } from 'react';
import { ToastContext, type Toast } from './toastContext';
import { Alert } from '@common/components/alert';
import { Logger } from '@utils/logger';

const DEFAULT_TOAST_DURATION = 5000;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((toastId: string) => {
    Logger.info('ToastProvider:HideToast', toastId);
    if (!toastId) {
      Logger.warn(
        'ToastProvider',
        `Hide toast called without toastId. Skipping hide operation.`,
      );
      return;
    }
    setToasts(prevToasts => {
      if (!prevToasts.find(toast => toast.id === toastId)) {
        return prevToasts;
      }
      return prevToasts.filter(toast => toast.id !== toastId);
    });
  }, []);

  const hideAllToasts = useCallback((groupId: string) => {
    Logger.info('ToastProvider:HideAllToasts', groupId);
    setToasts(prevToasts => {
      if (!groupId) {
        return [];
      }
      if (!prevToasts.find(toast => toast.groupId === groupId)) {
        return prevToasts;
      }
      return prevToasts.filter(toast => toast.groupId !== groupId);
    });
  }, []);

  const showToast = useCallback(
    (toast: Toast) => {
      Logger.info('ToastProvider:ShowToast:Try', toast);
      const id = toast.id || Math.random().toString(36);
      const newToast = { ...toast, id };
      setToasts(prevToasts => {
        if (prevToasts.find(t => t.id === id)) {
          Logger.warn(
            'ToastProvider',
            `Toast with id ${id} already exists. Skipping addition.`,
          );
          return prevToasts;
        }
        return [...prevToasts, newToast];
      });

      if (toast.duration === undefined || toast.duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, toast.duration || DEFAULT_TOAST_DURATION);
      }
    },
    [hideToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast, hideAllToasts }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Alert
            className="toast"
            key={toast.id}
            id={toast.id}
            type={toast.type || 'default'}
            message={toast.message}
            description={toast.description}
            icon={toast.icon || undefined}
            {...(toast.withCloseBtn
              ? {
                  onClose: () => hideToast(toast.id!),
                }
              : {})}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
