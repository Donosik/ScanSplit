import {useForm} from "react-hook-form";
import {registerDTO} from "../../utils/services/authService.ts";

export default function Register()
{
    const {register, handleSubmit,formState:{errors}} = useForm<registerDTO>()

    function onSubmit(data)
    {
        console.log(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("login",{required: true,minLength:{value:2,message:"minimum 2 characters"}})} />
                {errors.login&& <p>{errors.login.message}</p>}
                <input {...register("password",{required: true,minLength:2})} />
                <input {...register("name",{required: true,minLength:2})} />
                <input {...register("lastname",{required: true,minLength:2})} />
                <input {...register("phoneNumber",{required: true,minLength:2})} />
                <input {...register("email",{required: true,minLength:2})} />
                <button type="submit">Register</button>
            </form>
        </>
    )
}
