import RegisterForm from "./registerForm/RegisterForm.tsx";
import style from "./Register.module.css"

export default function Register()
{
    return (
        <div className={style.container}>
            <RegisterForm/>
        </div>
    )
}
