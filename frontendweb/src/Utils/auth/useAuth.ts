import {login, loginDTO} from "../services/authService.ts"

export function useAuth()
{
    function onLogin(loginData:loginDTO)
    {
        login(loginData).then(jwt => sessionStorage.setItem("token", jwt));
    }

    function onLogout()
    {
        sessionStorage.removeItem("token");
    }

    function isAuthorized():boolean
    {
        if(sessionStorage.getItem("token") == null)
            return false;
        return true;
    }

    return {login:onLogin,logout:onLogout,isAuthorized};
}
