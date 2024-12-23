import {useAuth} from "../../utils/auth/useAuth.ts";
import LoginForm from "./loginForm/LoginForm.tsx";
import style from "./Login.module.css"


export default function Login()
{
    const {login,isLoading,error}=useAuth()


    return (
        <div className={style.container}>
            <LoginForm onSubmit={login} error={error}/>
        </div>
    )
}
