import { Link } from '@tanstack/react-router';
import './style.css';
import { Badge } from '@common/components/badge';

export type ServiceItemProps = {
  name: string;
  description?: string;
  url: string;
  icon?: string;
  version?: string;
  disabled?: boolean; // Optional prop to disable the link
  // Define any props that the Service component might need
};
export const ServiceItem = ({
  name,
  version,
  description,
  url,
  disabled,
}: ServiceItemProps) => {
  return (
    <Link className={`service ${disabled ? 'service_disabled' : ''}`} to={url}>
      {version && <Badge className="service__version">{version}</Badge>}
      <h4
        className="service__title"
        dangerouslySetInnerHTML={{ __html: name }}
      />
      <p className="service__description">{description}</p>
    </Link>
  );
};
