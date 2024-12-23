import {login, loginDTO} from "../services/authService.ts"
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {AvailableRoutes} from "../router/AvailableRoutes.ts";

export function useAuth()
{
    const navigate = useNavigate()
    function isAuthenticated(): boolean
    {
        if (sessionStorage.getItem("token") == null)
            return false;
        return true;
    }

    const onLogin = useMutation({
        mutationFn: (data:loginDTO) => {
            return login(data)
        },
        onSuccess: (token:string) => {
            sessionStorage.setItem("token", token);
            navigate(AvailableRoutes.HOME)
        }
    })

    function onLoginReset(data: loginDTO) {
        onLogin.reset();
        onLogin.mutate(data);
    }

    function onLogout()
    {
        sessionStorage.removeItem("token");
    }

    return {login:onLoginReset,logout: onLogout, isAuthenticated: isAuthenticated,isLoading:onLogin.isPending,error:onLogin.error?.response?.data};
}
