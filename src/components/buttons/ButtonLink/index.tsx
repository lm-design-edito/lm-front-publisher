import { Link, type LinkProps } from "@tanstack/react-router";
import './style.css'

type ButtonLinkProps = {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 's' | 'm' | 'l';
    className?: string;
} & LinkProps;

const ButtonLink = ({size, variant, className, children, ...props}: ButtonLinkProps) => {
    const variantClass = variant ? `lmui-button_${variant}` : 'lmui-button_primary';
    const sizeClass = size ? `lmui-button_${size}` : 'lmui-button_m';

    return (
        <Link
            {...props}
            className={`button-link lmui-button ${variantClass} ${sizeClass} ${className || ''}`}
        >
            {children}
        </Link>
)
}

export default ButtonLink;