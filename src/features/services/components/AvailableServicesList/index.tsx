import './style.css';

/** @todo: list services available for user (depending on their permissions) */
type AvailableServicesListProps = {
    className?: string;
}

const Services = [
    {
        name: 'Image Formatter',
        role: 'image.format',
        url: '/service1',
        icon: 'icon1.png',
    },
    {
        name: 'Service 2',
        url: '/service2',
        icon: 'icon2.png',
    },
    {
        name: 'Service 3',
        url: '/service3',
        icon: 'icon3.png',
    },
    // Add more services as needed
]

const AvailableServicesList = ({ className }: AvailableServicesListProps) => {
    return (
        <div className={`available-services-list ${className || ''}`}>
            <h2>Services</h2>
            <p>This feature is not yet implemented.</p>
            <div className="available-services-list__elements">
                {/* Add your available services list implementation here */}
            </div>
        </div>
    );
}
export default AvailableServicesList;