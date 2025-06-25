type TableCellProps = {
  children?: React.ReactNode;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

const TableCell = ({ children, className, ...props }: TableCellProps) => {
  return (
    <td className={`lmui-chart-table__cell ${className}`} {...props}>
      {children}
    </td>
  );
}

export default TableCell;