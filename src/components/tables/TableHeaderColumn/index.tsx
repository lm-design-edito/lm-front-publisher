export type TableHeaderColumnProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export const TableHeaderColumn = ({
  title,
  children,
  className = '',
}: TableHeaderColumnProps) => (
  <th title={title} className={className}>
    {children}
  </th>
);
