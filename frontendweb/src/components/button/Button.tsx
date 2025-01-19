import style from "./Button.module.css"
import {ComponentPropsWithoutRef} from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button">{
    value: string
}

export default function Button({value="",...rest}:ButtonProps)
{
    return(
        <button className={style.button} {...rest}>
            {value}
        </button>
    )
}
