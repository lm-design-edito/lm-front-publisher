import { Headline } from '@common/components/headline';
import {
  ImageTransformerInfos,
  TransformerForm,
} from '@features/image-tools/transformer';
import {
  TransformerDownloadTable,
  type TransformerDownloadTableProps,
} from '@features/image-tools/transformer/components/transformer-download-table';
import { createFileRoute } from '@tanstack/react-router';
import { checkForAuthentifacted } from '../../../route-middleware';
import type { CustomRouteContext } from '../../../router';
import { useState } from 'react';
import { Display } from '@common/components/display';

type Download = TransformerDownloadTableProps['downloads'][0];

const TransformerPage = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const handleDownloadReady = (download: Download) => {
    setDownloads((prev: Download[]) => [
      { ...download, new: true },
      ...prev.map(download => ({ ...download, new: false })),
    ]);
  };
  return (
    <div>
      <Headline
        title={ImageTransformerInfos.name}
        description={ImageTransformerInfos.description}
      />
      <Display type="flex" direction="column" gap={5}>
        <TransformerForm onDownloadReady={handleDownloadReady} />
        <TransformerDownloadTable downloads={downloads} />
      </Display>
    </div>
  );
};

export const Route = createFileRoute('/image/transformer/')({
  component: TransformerPage,
  beforeLoad: async ({ context }: { context: CustomRouteContext }) => {
    checkForAuthentifacted({ context });
    // You can add any pre-load logic here if needed
  },
});
