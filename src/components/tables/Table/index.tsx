import { TableCell } from "../TableCell";
import { TableHeaderColumn } from "../TableHeaderColumn";
import { TableRow } from "../TableRow";

export type Column<T> = {
    id: keyof T; // Unique identifier for the column
    label: React.ReactNode; // Content to display in the column header,
    title?: string; // Optional title for the column header
    className?: string; // Optional className for styling the column header
    cell?: {
        render?: (row: T) => React.ReactNode; // Optional function to render cell content
        className?: string; // Optional className for styling the cell
    }
}

export type Row<T> = T & {
    rowId: string; // Unique identifier for the row, used as a key in rendering
}

export type TableProps<T> = {
    className?: string; // Optional className prop for styling
    title?: string; // Optional title prop
    emptyRowsLabel: React.ReactNode; // Label to display when the table is empty
    columns?: Array<Column<T>>; // Array of column definitions
    rows?: Array<Row<T>>; // Optional rows prop with index signature
}

export function Table<T>({ className, title, columns, emptyRowsLabel, rows }: TableProps<T>) {
    return (
        <div className={`lmui-chart ${className || ''}`}>
            {title && <h3 className="lmui-chart__title">{title}</h3>}
            <div className="lmui-chart__scroller">
                <table className="lmui-chart-table">
                    <thead>
                        <tr>
                            {columns?.map((column) => (
                                <TableHeaderColumn key={String(column.id)} title={column.title} className={column.className}>
                                    {column.label}
                                </TableHeaderColumn>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.length ? (
                            rows.map((row) => (
                                <TableRow key={row.rowId}>
                                    {columns?.map((column) => (
                                        <TableCell key={String(column.id)} className={column.cell?.className || ''}>
                                          <>
                                            {column.cell && column.cell.render ? column.cell.render(row) : row[column.id] ?? null}
                                          </>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns?.length}>
                                    {emptyRowsLabel}
                                </TableCell>
                            </TableRow>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
