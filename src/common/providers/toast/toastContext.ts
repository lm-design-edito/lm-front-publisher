import type { AlertProps } from '@common/components/alert';
import { createContext } from 'react';

export type Toast = {
  groupId?: string;
  id?: string;
  withCloseBtn?: boolean;
  duration?: number; // in milliseconds
  type?: AlertProps['type'];
} & Omit<AlertProps, 'onClose' | 'type'>;

export type ToastContextType = {
  showToast: (toast: Toast) => void;
  hideToast: (toastId: string) => void;
  hideAllToasts: (groupId: string) => void;
};

const defaultToastContext: ToastContextType = {
  showToast: () => {},
  hideToast: () => {},
  hideAllToasts: () => {},
};

export const ToastContextProviderValue = defaultToastContext;

export const ToastContext =
  createContext<ToastContextType>(defaultToastContext);
