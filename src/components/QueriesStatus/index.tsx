import './style.css';

type QueriesStatusProps = {
  children?: React.ReactNode;
  className?: string;
  success?: boolean;
  error?: boolean;
}

const QueriesStatus = ({children, success, error, className, ...props}: QueriesStatusProps) => {
  return (
    <div className={`queries-status ${success ? 'queries-status--success' : ''} ${error ? 'queries-status--error' : ''} ${className || ''}`} {...props}>{children}</div>
  );
}

export default QueriesStatus;