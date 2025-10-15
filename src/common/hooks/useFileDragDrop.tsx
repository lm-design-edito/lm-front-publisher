import { useCallback, useMemo, useState } from 'react';

type Props = {
  droppable?: boolean;
  onDrop?: (files: FileList) => void;
  acceptFormats?: string[]; // e.g., ['image/png', 'image/jpeg']
};

const useFileDragDrop = ({ droppable, onDrop, acceptFormats }: Props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDraggingInvalidOver, setIsDraggingInvalidOver] = useState(false);
  const [draggedFilesCount, setDraggedFilesCount] = useState(0);

  const isValidFormat = useCallback(
    (item: DataTransferItem) => {
      if (!acceptFormats || acceptFormats.length === 0) {
        return true; // No format restrictions
      }

      if (acceptFormats.includes(item.type)) {
        return true; // Exact match found
      }

      if (acceptFormats[0].endsWith('/*')) {
        const baseType = acceptFormats[0].split('/')[0];
        if (item.type.startsWith(baseType + '/')) {
          return true; // Matches the base type
        }
      }

      return false;
    },
    [acceptFormats],
  );

  const resetDrag = useCallback(() => {
    setDraggedFilesCount(0);
    setIsDraggingOver(false);
    setIsDraggingInvalidOver(false);
  }, []);

  const dragProps = useMemo(
    () =>
      droppable
        ? {
            droppable: 'true',
            onDragEnd: (e: React.DragEvent<HTMLElement>) => {
              e.preventDefault();
              e.stopPropagation();
              resetDrag();
            },
            onDragOver: (e: React.DragEvent<HTMLElement>) => {
              e.preventDefault();
              e.stopPropagation();
              /* Check if format is accepted */
              if (e.dataTransfer.items) {
                const items = Array.from(e.dataTransfer.items);
                const hasValidFormat = items.every(item => isValidFormat(item));
                if (!hasValidFormat) {
                  e.dataTransfer.dropEffect = 'none';
                  setIsDraggingInvalidOver(true);
                  setDraggedFilesCount(0);
                  return;
                }
              }

              setDraggedFilesCount(e.dataTransfer.items.length);

              setIsDraggingInvalidOver(false);
              setIsDraggingOver(true);
            },
            onDragLeave: (e: React.DragEvent<HTMLElement>) => {
              e.preventDefault();
              e.stopPropagation();
              resetDrag();
            },
            onDrop: (e: React.DragEvent<HTMLElement>) => {
              if (e.dataTransfer.files.length > 0) {
                e.preventDefault();
                if (onDrop) {
                  onDrop(e.dataTransfer.files);
                }
              }
              resetDrag();
            },
          }
        : {},
    [droppable, onDrop, isValidFormat, resetDrag],
  );

  return {
    dragProps,
    draggedFilesCount,
    isDraggingOver,
    isDraggingInvalidOver,
  };
};

export default useFileDragDrop;
