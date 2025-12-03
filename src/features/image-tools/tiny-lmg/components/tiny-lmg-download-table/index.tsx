import { Table, type Column, type Row } from '@common/components/tables';
import './style.css';
import { Badge } from '@common/components/badge';
import { Display } from '@common/components/display';
import type { DownloadItem } from '../types';

export type TinyLMGDownloadTableProps = {
  downloads: (DownloadItem & { isNew: boolean })[];
};

type TinyLMGDownloadTableRow = {
  name: string;
  url: string;
  isNew: boolean;
  sourceName: string;
  dimensions: string; // e.g., "800x600"
  format: string;
  date: string;
  quality: number;
  preview: string;
};

const getFormatForMimeType = (mimeType: string): string => {
  const parts = mimeType.split('/');
  return parts.length > 1 ? parts[1] : 'unknown';
};

export const TinyLMGDownloadTable = ({
  downloads,
}: TinyLMGDownloadTableProps) => {
  const columns: Column<TinyLMGDownloadTableRow>[] = [
    {
      id: 'preview',
      label: 'Aperçu',
      cell: {
        render: row => (
          <a href={row.url} target="_blank" rel="noopener noreferrer">
            <img
              className="tiny-lmg-download-table__preview"
              src={row.url}
              alt={row.name}
            />
          </a>
        ),
        className: 'tiny-lmg-download-table__preview-cell',
      },
    },
    {
      id: 'url',
      label: 'URL de téléchargement',
      cell: {
        render: row => (
          <Display type="flex" align="center">
            <a
              href={row.url}
              target="_blank"
              rel="noopener noreferrer"
              download={row.name}
            >
              Télécharger
            </a>
            {row.isNew ? <Badge color="green">Nouveau</Badge> : null}
          </Display>
        ),
      },
    },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'format', label: 'Format' },
    { id: 'quality', label: 'Qualité' },
    { id: 'sourceName', label: 'Source' },
    { id: 'date', label: 'Heure de génération' },
  ];

  const rows: Row<TinyLMGDownloadTableRow>[] = downloads.map(
    (download, index) => ({
      rowId: index.toString(),
      name: download.name,
      preview: download.name,
      dimensions: `${download.dimensions.width}x${download.dimensions.height}`,
      sourceName: download.sourceName,
      format: getFormatForMimeType(download.mimeType),
      quality: download.quality,
      url: download.url,
      date: download.date.toLocaleTimeString(),
      isNew: download.isNew || false, // Use the new property if it exists
    }),
  );

  return (
    <Table
      title="Liste des téléchargements"
      className="downloads-list"
      emptyRowsLabel={
        <Display type="flex" direction="column" gap={1}>
          <span>Aucune image n'a été générée.</span>
          <span>Compresser une ou plusieurs images pour les télécharger.</span>
        </Display>
      }
      columns={columns}
      rows={rows}
    />
  );
};
