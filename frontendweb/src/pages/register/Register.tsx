import RegisterForm from "./registerForm/RegisterForm.tsx";
import style from "./Register.module.css"
import {register, registerDTO} from "../../utils/services/authService.ts";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {AvailableRoutes} from "../../utils/router/availableRoutes.ts";

export default function Register()
{
    const navigate = useNavigate();
    const{mutate,reset,error}=useMutation({
        mutationFn:(data:registerDTO)=>{
            return register(data)
        },
        onSuccess:()=>{
            navigate(AvailableRoutes.LOGIN)
        }
    })

    function onSubmit(data:registerDTO)
    {
        reset()
        mutate(data)
    }

    return (
        <div className={style.container}>
            <RegisterForm onSubmit={onSubmit} error={error?.message} />
        </div>
    )
}
