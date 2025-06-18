import Loader from "../../Loader";

type ButtonProps = {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 's' | 'm' | 'l';
    className?: string;
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({size, variant, className, children, isLoading, ...props}: ButtonProps) => {
    const variantClass = variant ? `lmui-button_${variant}` : 'lmui-button_primary';
    const sizeClass = size ? `lmui-button_${size}` : 'lmui-button_m';

    return (
        <button
            {...props}
            className={`lmui-button ${variantClass} ${sizeClass} ${className || ''}`}
        >
            {children}
            {isLoading && <Loader />}
        </button>
)
}

export default Button;