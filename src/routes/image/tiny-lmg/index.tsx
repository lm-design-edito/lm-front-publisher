import { ImageTinyLMGInfos, TinyLMGForm } from '@features/image-tools/tiny-lmg';
import { createFileRoute } from '@tanstack/react-router';
import { checkForAuthentifacted } from '../../../route-middleware';

import { Headline } from '@common/components/headline';
import { useState } from 'react';
import {
  TinyLMGDownloadTable,
  type TinyLMGDownloadTableProps,
} from '@features/image-tools/tiny-lmg/components/tiny-lmg-download-table';
import { Display } from '@common/components/display';
import type { DownloadItem } from '@features/image-tools/tiny-lmg/components/types';

type DownloadForTable = TinyLMGDownloadTableProps['downloads'][0];

const TinyLMGPage = () => {
  const [downloads, setDownloads] = useState<DownloadForTable[]>([]);
  const handleDownloadReady = (downloads: DownloadItem[]) => {
    setDownloads((prev: DownloadForTable[]) => [
      ...downloads.map(download => ({ ...download, isNew: true })),
      ...prev.map(download => ({ ...download, isNew: false })),
    ]);
  };
  return (
    <div className="tiny-lmg-page">
      <Headline
        title={ImageTinyLMGInfos.name}
        description={ImageTinyLMGInfos.description}
      />
      <Display type="flex" direction="column" gap={5}>
        <TinyLMGForm onDownloadReady={handleDownloadReady} />
        <TinyLMGDownloadTable downloads={downloads} />
      </Display>
    </div>
  );
};

export const Route = createFileRoute('/image/tiny-lmg/')({
  staticData: {
    getBreadcrumb: () => 'Tiny LMG',
    title: "Tiny LMG - Optimisation d'images",
  },
  component: TinyLMGPage,
  beforeLoad: async ({ context }) => {
    checkForAuthentifacted({ context });
    // You can add any pre-load logic here if needed
  },
});
