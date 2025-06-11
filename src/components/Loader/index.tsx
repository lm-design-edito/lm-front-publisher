type LoaderProps = {
    size?: 's' | 'l';
    className?: string;
}
const Loader = ({size, className, ...props}: LoaderProps) => (
    <div className={`lmui-loader ${size ? `lmui-loader_${size}` : 'lmui-loader_s'} ${className || ''}`} {...props}></div>
)

export default Loader;