import RegisterForm from "./registerForm/RegisterForm.tsx";
import style from "./Register.module.css"
import {registerDTO} from "../../utils/services/authService.ts";

export default function Register()
{
    function onSubmit(data:registerDTO)
    {
        console.log(data);
    }

    return (
        <div className={style.container}>
            <RegisterForm onSubmit={onSubmit}/>
        </div>
    )
}
