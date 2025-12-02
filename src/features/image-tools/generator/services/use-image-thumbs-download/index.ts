import { api } from '@api/index';
import { useQueries } from '@tanstack/react-query';
import { IMAGE_UPLOAD_IDS_CACHE } from '../config';
import { useMemo } from 'react';

type StorageItemType = {
  id: string;
  timeOut: number;
};

export function useImageThumbsDownload(params: { idList: string[] }) {
  const currentTime = Date.now();

  const downloadList = useMemo(() => {
    const _downloadList = params.idList.map(id => ({
      id,
      timeOut: currentTime + 1000 * 60 * 15,
    })); // 15 minutes

    const storedList = localStorage.getItem(IMAGE_UPLOAD_IDS_CACHE);
    if (storedList) {
      const parsedStoredList: StorageItemType[] = JSON.parse(storedList);
      const filteredList = parsedStoredList.filter(
        item => item.timeOut > currentTime,
      );

      filteredList.forEach(storedInfo => {
        if (!_downloadList.find(item => item.id === storedInfo.id)) {
          _downloadList.push(storedInfo);
        }
      });
    }
    localStorage.setItem(IMAGE_UPLOAD_IDS_CACHE, JSON.stringify(_downloadList));

    return _downloadList;
  }, [params.idList, currentTime]);

  const thumbsQueries = useQueries({
    queries: downloadList.map(item => {
      return {
        queryKey: ['thumb-download', item.id],
        queryFn: () => api.queries.designEdito.thumbDownload({ id: item.id }),
        placeholderData: {
          httpStatus: 200,
          success: true,
          type: 'loading',
          payload: {
            url: 'PLACEHOLDER',
            size: 0,
            name: item.id,
            id: item.id,
            mimeType: 'png',
            format: 'png',
          },
        },
      };
    }),
  });

  return thumbsQueries
    .map(query => {
      const { data } = query;
      if (!data || !data.success) {
        return undefined;
      }
      return data.payload;
    })
    .filter(item => item !== undefined);
}
