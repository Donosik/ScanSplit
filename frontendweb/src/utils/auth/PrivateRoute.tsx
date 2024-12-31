import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "./useAuth.ts";
import {AvailableRoutes} from "../router/availableRoutes.ts";

export default function PrivateRoute()
{
    const {isAuthenticated}=useAuth()
    if(!isAuthenticated()){
        return <Navigate to={AvailableRoutes.LOGIN}/>
    }
    return <Outlet/>
}
