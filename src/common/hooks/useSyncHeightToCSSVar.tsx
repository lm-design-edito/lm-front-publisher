import { useResizeObserver } from './useResizeObserver';

type UseSyncHeightToCSSVarProps = {
  target: React.RefObject<HTMLElement | null>;
  cssPropertyName: string;
};

export const useSyncHeightToCSSVar = ({
  target,
  cssPropertyName,
}: UseSyncHeightToCSSVarProps) => {
  useResizeObserver({
    target: target,
    onResize: () => {
      if (target.current) {
        const height = target.current.offsetHeight;
        document.documentElement.style.setProperty(
          cssPropertyName,
          `${height}px`,
        );
      }
    },
    onDisconnect: () => {
      document.documentElement.style.setProperty(cssPropertyName, '0px');
    },
  });
};
