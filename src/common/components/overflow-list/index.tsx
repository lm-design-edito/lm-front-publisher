import './style.css';

type OverflowListProps = {
  children?: React.ReactNode;
};

export const OverflowList = ({ children }: OverflowListProps) => {
  return (
    <div className="overflow-list">
      <div className="overflow-list__content">{children}</div>
    </div>
  );
};
