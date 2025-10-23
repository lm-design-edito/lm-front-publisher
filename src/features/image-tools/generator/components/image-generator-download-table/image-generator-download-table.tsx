import { Table, type Column, type Row } from '@common/components/tables/table';
// import './style.css';
import { Badge } from '@common/components/badge';
import { Display } from '@common/components/display';

export type GeneratorDownload = {
  name: string;
  url: string;
  mimeType: string;
  date: Date;
  new?: boolean; // Optional property to indicate if the download is new
  sourceName: string; // The name of the original file
};

export type GeneratorDownloadTableProps = {
  downloads: GeneratorDownload[];
};

type GeneratorDownloadTableRow = {
  name: string;
  url: string;
  new: boolean;
  sourceName: string;
  format: string;
  date: string;
  preview: string;
};

const getFormatForMimeType = (mimeType: string): string => {
  const parts = mimeType.split('/');
  return parts.length > 1 ? parts[1] : 'unknown';
};

export const GeneratorDownloadTable = ({
  downloads,
}: GeneratorDownloadTableProps) => {
  const columns: Column<GeneratorDownloadTableRow>[] = [
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
            {row.new ? <Badge color="green">Nouveau</Badge> : null}
          </Display>
        ),
      },
    },
    { id: 'format', label: 'Format' },
    { id: 'sourceName', label: 'Source' },
    { id: 'date', label: 'Heure de génération' },
  ];

  const rows: Row<GeneratorDownloadTableRow>[] = downloads.map(
    (download, index) => ({
      rowId: index.toString(),
      name: download.name,
      preview: download.name,
      sourceName: download.sourceName,
      format: getFormatForMimeType(download.mimeType),
      url: download.url,
      date: download.date.toLocaleTimeString(),
      new: download.new || false, // Use the new property if it exists
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
