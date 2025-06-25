export type LoaderProps = {
    size?: 's' | 'l';
    className?: string;
}
export const Loader = ({size, className, ...props}: LoaderProps) => (
    <div className={`lmui-loader ${size ? `lmui-loader_${size}` : 'lmui-loader_s'} ${className || ''}`} {...props}></div>
)