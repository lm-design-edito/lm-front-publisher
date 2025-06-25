type TableRowProps = {
  children?: React.ReactNode;
} & React.TableHTMLAttributes<HTMLTableRowElement>;

const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr className={`lmui-chart-table__row ${className}`} {...props}>
      {children}
    </tr>
  );
}

export default TableRow;
