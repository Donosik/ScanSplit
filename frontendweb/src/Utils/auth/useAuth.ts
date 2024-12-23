import {login, loginDTO} from "../services/authService.ts"
import {useMutation} from "@tanstack/react-query";

export function useAuth()
{
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
        onSuccess: (user) => {
            console.log("success");
            console.log(user);
        },
        onError: (error) => {
            console.log("error")
            console.log(error.response.data);
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

    return {login:onLoginReset,logout: onLogout, isAuthenticated: isAuthenticated,isLoading:onLogin.isPending,error:onLogin.error?.response.data};
}
