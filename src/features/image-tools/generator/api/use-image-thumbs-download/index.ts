import { api } from '@api/index';
import { useQueries } from '@tanstack/react-query';

type StorageItemType = {
  id: string;
  timeOut: number;
};

const STORAGE_KEY = 'image-thumbs-download';
export function useImageThumbsDownload(params: { idList: string[] }) {
  const currentTime = Date.now();
  const downloadList = params.idList.map(id => ({
    id,
    timeOut: currentTime + 1000 * 60 * 15,
  })); // 15 minutes

  const storedList = localStorage.getItem(STORAGE_KEY);
  if (storedList) {
    const parsedStoredList: StorageItemType[] = JSON.parse(storedList);
    const filteredList = parsedStoredList.filter(
      item => item.timeOut > currentTime,
    );

    filteredList.forEach(storedInfo => {
      if (!downloadList.find(item => item.id === storedInfo.id)) {
        downloadList.push(storedInfo);
      }
    });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(downloadList));

  const thumbsQueries = useQueries({
    queries: downloadList.map(item => {
      return {
        queryKey: ['thumb-download', item.id],
        queryFn: () => api.queries.designEdito.thumbDownload({ id: item.id }),
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
