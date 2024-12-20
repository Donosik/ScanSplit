import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "./useAuth.ts";
import {AvailableRoutes} from "../router/AvailableRoutes.ts";

export default function PrivateRoute()
{
    const {isAuthorized}=useAuth()
    if(!isAuthorized()){
        return <Navigate to={AvailableRoutes.LOGIN}/>
    }
    return <Outlet/>
}
