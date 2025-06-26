import { Link } from '@tanstack/react-router';
import './style.css';

export type ServiceItemProps = {
  name: string;
  description?: string;
  url: string;
  icon?: string;
  disabled?: boolean; // Optional prop to disable the link
  // Define any props that the Service component might need
};
export const ServiceItem = ({
  name,
  description,
  url,
  disabled,
}: ServiceItemProps) => {
  return (
    <Link className={`service ${disabled ? 'service_disabled' : ''}`} to={url}>
      <h4 className="service__title">{name}</h4>
      <p className="service__description">{description}</p>
    </Link>
  );
};