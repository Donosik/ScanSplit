import {useForm} from "react-hook-form";
import {registerDTO} from "../../../utils/services/authService.ts";
import Input from "../../../components/input/Input.tsx";
import style from "./RegisterForm.module.css"
import Button from "../../../components/button/Button.tsx";
import {Link} from "react-router-dom";

interface RegisterFormProps{
    onSubmit:(data:registerDTO)=>void,
}

export default function RegisterForm({onSubmit}: RegisterFormProps)
{
    const {register, handleSubmit, formState: {errors}} = useForm<registerDTO>()

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
            <Input
                label="Name"
                placeholder={"John"}
                {...register("name", {
                    required: "Name is required",
                    minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters long"
                    }
                })}
                error={errors.name?.message}
            />
            <Input
                label="Last Name"
                placeholder={"Smith"}
                {...register("lastname", {
                    required: "Last Name is required",
                    minLength: {
                        value: 2,
                        message: "Last Name must be at least 2 characters long"
                    }
                })}
                error={errors.lastname?.message}
            />
            <Input
                label="Phone Number"
                placeholder={"123456789"}
                {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                        value: /^[0-9]{9,15}$/,
                        message: "Phone number must be valid and contain 9-15 digits"
                    }
                })}
                error={errors.phoneNumber?.message}
            />
            <Input
                label="E-mail"
                placeholder={"email@example.com"}
                {...register("email", {
                    required: "E-mail is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "E-mail must be a valid email address"
                    }
                })}
                error={errors.email?.message}
            />
            <Button type="submit"/>
            <div className={style.loginLink}>
                <Link to="/login" className={style.linkText}>Login</Link>
            </div>
        </form>
    )
}
