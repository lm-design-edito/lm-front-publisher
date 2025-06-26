export type TableCellProps = {
  children?: React.ReactNode;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = ({
  children,
  className = '',
  ...props
}: TableCellProps) => {
  return (
    <td className={`lmui-chart-table__cell ${className}`} {...props}>
      {children}
    </td>
  );
};
