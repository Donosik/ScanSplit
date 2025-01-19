import {useNavigate} from "react-router-native";
import {useMutation} from "@tanstack/react-query";
import {login, loginDTO} from "../services/authService.ts";

export function useAuth()
{
    const navigate = useNavigate();
    function isAuthenticated():boolean{
        return false
    }
    const onLogin=useMutation({
        mutationFn:(data:loginDTO)=>{
            return login(data)
        },
        onSuccess:(token:string)=>{
            stora
        }
    })
}
