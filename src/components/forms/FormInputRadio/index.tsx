import type { FieldError } from "react-hook-form";
import { FormLabel } from "../FormLabel";


export type FormInputRadioProps = {
    className?: string;
    label?: string;
    error?: FieldError;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>,
    inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

const FormInputRadio = ({ className, error, label, labelProps, inputProps }: FormInputRadioProps) => {
    return (
        <div className={`lmui-radio ${className} lmui-radio_error ${error ? "lmui-radio_error" : ""} `}>
            <input id="lmui-radio-01" className="lmui-radio__input" type="radio" {...inputProps} />
            {label && 
                <FormLabel 
                    className={`"lmui-radio__label" ${labelProps?.className || ''}`} {...labelProps}>{label || 'Label optionnel'}
                </FormLabel>
            }
            <span className="form__error lmui-form__error-message lmui-form__error-visible">
          {error ? error.message : ""}
      </span>
        </div>
    );
};

export {FormInputRadio};