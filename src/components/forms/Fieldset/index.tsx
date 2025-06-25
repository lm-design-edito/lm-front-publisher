import './style.css';

export type FieldsetProps = {
    className?: string;
    legend?: string | React.ReactNode;
    contentClassName?: string;
    children?: React.ReactNode;
}

export const FieldSet = ({ className = '', legend: _legend, contentClassName, children }: FieldsetProps) => {
    return (
        <fieldset className={className} >
            {_legend && <legend>{_legend}</legend>}
            <div className={contentClassName}>
                {children}
            </div>
        </fieldset>
    )
}