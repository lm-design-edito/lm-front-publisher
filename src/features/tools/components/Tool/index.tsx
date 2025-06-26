import { Link } from '@tanstack/react-router';
import './style.css';

type ToolProps = {
    name: string;
    description?: string;
    url: string;
    icon?: string;
    disabled?: boolean; // Optional prop to disable the link
  // Define any props that the Service component might need
} 
const Tool = ({name, description, url, disabled}: ToolProps) => {
  return (
    <Link className={`tool ${disabled ? 'tool_disabled' : ''}`} to={url}>
      <h4 className="tool__title">{name}</h4>
      <p className="tool__description">{description}</p>
    </Link>
  );
}

export default Tool;