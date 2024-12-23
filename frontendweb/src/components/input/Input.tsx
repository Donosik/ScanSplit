import style from './Input.module.css'
import {forwardRef, useEffect, useState} from "react";
import AnimateHeight from "react-animate-height";

interface InputProps
{
    label: string,
    name: string,
    type?: string,
    placeholder?: string,
    error?: string,
}

export default forwardRef<HTMLInputElement, InputProps>(function Input({
                                                                           label,
                                                                           name,
                                                                           type = "text",
                                                                           placeholder,
                                                                           error,
                                                                           ...rest
                                                                       }: InputProps, ref)
{
    const [debouncedError, setDebouncedError] = useState<string | undefined>(error)

    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
            setDebouncedError(error);
        }, 500);
        return () => clearTimeout(timer);

    }, [error]);

    return (
        <div className={style.container}>
            <label htmlFor={name} className={style.label}>
                {label}
            </label>
            <input ref={ref}
                   id={name}
                   name={name}
                   type={type}
                   className={`${style.input} ${error ? style.errorInput : ''}`}
                   placeholder={placeholder}
                   aria-invalid={error ? 'true' : 'false'}
                   {...rest}
            />
            <AnimateHeight height={error ? "auto" : 0} animateOpacity={true}>
                <span className={style.errorMessage}>
                    {error ? error : debouncedError}
                </span>
            </AnimateHeight>
        </div>
    )
})
