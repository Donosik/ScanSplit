import {useForm} from "react-hook-form";
import {registerDTO} from "../../utils/services/authService.ts";
import Input from "../../components/input/Input.tsx";

export default function Register()
{
    const {register, handleSubmit, formState: {errors}} = useForm<registerDTO>()

    function onSubmit(data: registerDTO)
    {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label={"Login"} {...register("login",
                    {
                        required: "This field is required",
                        minLength: {
                            value: 2, message: "minimum 2 characters"
                        }
                    })}
                       error={errors.login?.message}/>
                <button type="submit">Register</button>
            </form>
        </>
    )
}
