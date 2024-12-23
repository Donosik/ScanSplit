import style from "./Button.module.css"



export default function Button({...rest})
{
    return(
        <button className={style.button} {...rest}>
            Register
        </button>
    )
}
