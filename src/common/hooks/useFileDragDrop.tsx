import { useMemo, useState } from 'react';

type Props = {
  droppable?: boolean;
  onDrop?: (files: FileList) => void;
};

const useFileDragDrop = ({ droppable, onDrop }: Props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const dragProps = useMemo(
    () =>
      droppable
        ? {
            droppable: 'true',
            onDragEnd: (e: React.DragEvent<HTMLElement>) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingOver(false);
            },
            onDragOver: (e: React.DragEvent<HTMLElement>) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingOver(true);
            },
            onDragLeave: (e: React.DragEvent<HTMLElement>) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingOver(false);
            },
            onDrop: (e: React.DragEvent<HTMLElement>) => {
              if (e.dataTransfer.files.length > 0) {
                e.preventDefault();
                if (onDrop) {
                  onDrop(e.dataTransfer.files);
                }
              }
              setIsDraggingOver(false);
            },
          }
        : {},
    [droppable, onDrop],
  );
  // Placeholder for drag and drop logic

  return {
    dragProps,
    isDraggingOver,
  };
};

export default useFileDragDrop;
