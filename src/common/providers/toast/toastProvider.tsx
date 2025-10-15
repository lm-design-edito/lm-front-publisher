import { useCallback, useState } from 'react';
import { ToastContext, type Toast } from './toastContext';
import { Alert } from '@common/components/alert';

const DEFAULT_TOAST_DURATION = 5000;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  console.log('toast provider render');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((toastId: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== toastId));
  }, []);

  const hideAllToasts = useCallback((groupId: string) => {
    setToasts(prevToasts => {
      if (!groupId) {
        return [];
      }
      return prevToasts.filter(toast => toast.groupId !== groupId);
    });
  }, []);

  const showToast = useCallback(
    (toast: Toast) => {
      const id = toast.id || Math.random().toString(36);
      const newToast = { ...toast, id };
      setToasts(prevToasts => {
        if (prevToasts.find(t => t.id === id)) {
          console.warn('Toast with this id already exists:', id);
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
