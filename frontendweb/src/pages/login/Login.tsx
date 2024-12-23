import {axiosWithAuth} from "../../utils/axios/axios.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "../../utils/auth/useAuth.ts";
import LoginForm from "./loginForm/LoginForm.tsx";
import {loginDTO} from "../../utils/services/authService.ts";
import style from "./Login.module.css"

async function fetchMe()
{
    const response = await axiosWithAuth.get("/user")
    return response.data
}

export default function Login()
{
    const {data, refetch} = useQuery({queryFn: fetchMe, queryKey: ["test"], enabled: false})
    const {login,logout:onLogout}=useAuth()
    const queryClient=useQueryClient()

    function getMe()
    {
        refetch()
        console.log(data)
    }

    function logout()
    {
        onLogout()
        queryClient.resetQueries(["test"])
    }

    function showData(data:loginDTO)
    {
        console.log(data)
    }

    return (
        <div className={style.container}>Logowanie
            <button onClick={()=>login({login:"string",password:"string"})}>logowanie</button>
            <button onClick={getMe}>getMe</button>
            <button onClick={logout}>logout</button>
            <LoginForm onSubmit={showData}/>
        </div>
    )
}
