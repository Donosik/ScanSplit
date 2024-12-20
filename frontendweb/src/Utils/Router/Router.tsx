import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddNewBill from "../../pages/addNewBill/AddNewBill.tsx";
import {NotFound} from "../../pages/notfound/NotFound.tsx";
import {LoggedLayout} from "../../pages/loggedLayout/LoggedLayout.tsx";
import {AvailableRoutes} from "./AvailableRoutes.ts";
import Login from "../../pages/Login.tsx";
import PrivateRoute from "../auth/PrivateRoute.tsx";

export function Router()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AvailableRoutes.LOGIN} element={<Login/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route element={<LoggedLayout/>}>
                        <Route path={AvailableRoutes.HOME} element={<AddNewBill/>}/>
                    </Route>
                    <Route path={"*"} element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
