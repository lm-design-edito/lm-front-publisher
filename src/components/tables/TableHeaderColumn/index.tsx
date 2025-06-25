
interface TableHeaderColumnProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
}

const TableHeaderColumn = ({ title, children, className }: TableHeaderColumnProps) => (
    <th title={title} className={className}>{children}</th>
);

export default TableHeaderColumn;