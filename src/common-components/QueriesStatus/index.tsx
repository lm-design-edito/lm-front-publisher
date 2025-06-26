import './style.css';

export type QueriesStatusProps = {
  children?: React.ReactNode;
  className?: string;
  status: 'loading' | 'error' | 'success';
};

export const QueriesStatus = ({
  children,
  status,
  className = '',
  ...props
}: QueriesStatusProps) => {
  return (
    <div
      className={`queries-status queries-status_${status} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
