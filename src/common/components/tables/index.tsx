import { Table as TableRoot } from './table';
import { TableCell } from './table-cell';
import { TableHeaderColumn } from './table-header-column';
import { TableRow } from './table-row';

export const Table = Object.assign(TableRoot, {
  Cell: TableCell,
  HeaderColumn: TableHeaderColumn,
  Row: TableRow,
});

export type { Row } from './table';
export type { Column } from './table';
export type { TableProps } from './table';
export type { TableCellProps } from './table-cell';
export type { TableHeaderColumnProps } from './table-header-column';
export type { TableRowProps } from './table-row';
