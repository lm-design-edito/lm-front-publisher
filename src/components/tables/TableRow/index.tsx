export type TableRowProps = {
  children?: React.ReactNode;
} & React.TableHTMLAttributes<HTMLTableRowElement>;

export const TableRow = ({
  children,
  className = '',
  ...props
}: TableRowProps) => {
  return (
    <tr className={`lmui-chart-table__row ${className}`} {...props}>
      {children}
    </tr>
  );
};
