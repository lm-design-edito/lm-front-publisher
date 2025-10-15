import { ToastContext } from '@common/providers/toast/toastContext';
import { useContext } from 'react';

export const useToastContext = () => {
  const { showToast, hideToast } = useContext(ToastContext);

  return {
    showToast,
    hideToast,
  };
};
