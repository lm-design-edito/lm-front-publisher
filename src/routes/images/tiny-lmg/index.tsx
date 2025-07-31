import { ImageTinyLMGInfos, TinyLMGForm } from '@features/image-tools/tiny-lmg';
import { createFileRoute } from '@tanstack/react-router';
import type { CustomRouteContext } from '../../../router';
import { checkForAuthentifacted } from '../../../route-middleware';

import { Headline } from '@common-components/headline';
import { useState } from 'react';
import {
  TinyLMGDownloadTable,
  type TinyLMGDownloadTableProps,
} from '@features/image-tools/tiny-lmg/components/tiny-lmg-download-table';
import { Display } from '@common-components/display';

type Download = TinyLMGDownloadTableProps['downloads'][0];

const TinyLMGPage = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const handleDownloadReady = (
    downloads: TinyLMGDownloadTableProps['downloads'],
  ) => {
    setDownloads((prev: Download[]) => [
      ...downloads.map(download => ({ ...download, new: true })),
      ...prev.map(download => ({ ...download, new: false })),
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

export const Route = createFileRoute('/images/tiny-lmg/')({
  component: TinyLMGPage,
  beforeLoad: async ({ context }: { context: CustomRouteContext }) => {
    checkForAuthentifacted({ context });
    // You can add any pre-load logic here if needed
  },
});
