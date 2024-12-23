import {useForm} from "react-hook-form";
import {loginDTO} from "../../../utils/services/authService.ts";
import style from "./LoginForm.module.css";
import Input from "../../../components/input/Input.tsx";
import Button from "../../../components/button/Button.tsx";
import {Link} from "react-router-dom";
import {AvailableRoutes} from "../../../utils/router/AvailableRoutes.ts";

interface LoginFormProps {
    onSubmit: (data: loginDTO) => void;
}

export default function LoginForm({onSubmit}: LoginFormProps)
{
    const {register,handleSubmit,formState:{errors}} = useForm<loginDTO>()

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Login"
                {...register("login", {
                    required: "Login is required",
                    minLength: {
                        value: 3,
                        message: "Login must be at least 3 characters long"
                    }
                })}
                error={errors.login?.message}
            />
            <Input
                label="Password"
                type="password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long"
                    }
                })}
                error={errors.password?.message}
            />
            <Button value={"Login"} type="submit"/>
            <div className={style.loginLink}>
                <Link to={AvailableRoutes.REGISTER} className={style.linkText}>Register here</Link>
            </div>
        </form>
    )
}
