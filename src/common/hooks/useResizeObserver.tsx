import { useLayoutEffect } from 'react';

type UseResizeObserverProps = {
  target: React.RefObject<HTMLElement | null>;
  onResize: () => void;
  onDisconnect?: () => void;
};

export const useResizeObserver = ({
  target,
  onResize,
  onDisconnect,
}: UseResizeObserverProps) => {
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });
    if (target.current) {
      resizeObserver.observe(target.current);
    }

    return () => {
      onDisconnect?.();
      resizeObserver.disconnect();
    };
  }, [target, onResize, onDisconnect]);
};
