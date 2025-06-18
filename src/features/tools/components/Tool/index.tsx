import { Link } from '@tanstack/react-router';
import './style.css';

type ToolProps = {
    name: string;
    description?: string;
    url: string;
    icon?: string;
  // Define any props that the Service component might need
} 
const Tool = ({name, description, url}: ToolProps) => {
  return (
    <Link className="tool" to={url}>
      <h4 className="tool__title">{name}</h4>
      <p className="tool__description">{description}</p>
    </Link>
  );
}

export default Tool;