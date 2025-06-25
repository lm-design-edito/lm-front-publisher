import { Loader }from "../../Loader";
import './style.css'

export type ButtonProps = {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary';
    color?:  'danger' | 'success';
    size?: 's' | 'm' | 'l';
    className?: string;
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({size, variant, color, className, children, isLoading, ...props}: ButtonProps) => {
    const variantClass = variant ? `lmui-button_${variant}` : 'lmui-button_primary';
    const sizeClass = size ? `lmui-button_${size}` : 'lmui-button_m';
    const colorClass = color ? `lmui-button_${color}` : '';

    return (
        <button
            {...props}
            className={`lmui-button ${variantClass} ${sizeClass} ${colorClass} ${className || ''}`}
        >
            {children}
            {isLoading && <Loader />}
        </button>
)
}