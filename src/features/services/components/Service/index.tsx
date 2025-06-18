type ServiceProps = {
    name: string;
    url?: string;
    icon?: string;
  // Define any props that the Service component might need
} 
const Service = (props: ServiceProps) => {
  return (
    <div>
      <h1>Service Component</h1>
      <p>This is the service component.</p>
    </div>
  );
}

export default Service;