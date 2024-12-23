import style from './Input.module.css'
import {forwardRef} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage.tsx";

interface InputProps
{
    label: string,
    name: string,
    type?: string,
    placeholder?: string,
    error?: string,
}

export default forwardRef<HTMLInputElement, InputProps>
(function Input({label, name, type = "text", placeholder, error, ...rest}: InputProps, ref)
{

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
            <ErrorMessage error={error}/>
        </div>
    )
})
