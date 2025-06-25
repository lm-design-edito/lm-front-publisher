import './style.css';

export type QueriesStatusProps = {
  children?: React.ReactNode;
  className?: string;
  success?: boolean;
  error?: boolean;
}

export const QueriesStatus = ({children, success, error, className = '', ...props}: QueriesStatusProps) => {
  return (
    <div className={`queries-status ${success ? 'queries-status_success' : ''} ${error ? 'queries-status_error' : ''} ${className}`} {...props}>{children}</div>
  );
}