type LabelProps = {
    children?: React.ReactNode;
    className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement> 

const FormLabel = ({ children, className, ...props }: LabelProps) => {
    if (!children) {
        return null;
    }

    return  <label className={`${className || ''} form__label`} {...props}>{children}</label>
}

export default FormLabel