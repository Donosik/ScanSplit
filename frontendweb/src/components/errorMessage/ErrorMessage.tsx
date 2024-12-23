import AnimateHeight from "react-animate-height";
import style from "./ErrorMessage.module.css";
import {useEffect, useState} from "react";

interface ErrorMessageProps
{
    error?: string
}

export default function ErrorMessage({error}: ErrorMessageProps)
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
        <>
            <AnimateHeight height={error ? "auto" : 0} animateOpacity={true}>
                <span className={style.errorMessage}>
                    {error ? error : debouncedError}
                </span>
            </AnimateHeight>
        </>
    )
}
